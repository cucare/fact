<?php
//======================================================================
//================== диспетчер ajax-запросов к базе ====================
//======================================================================

$mysqli = new mysqli('localhost', 'fact_user', 'fact123', 'fact');


if ($mysqli->connect_errno)
{
	echo json_encode(array('status'=>'fail', 'msg'=>'db connection fail: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
	exit();
}

switch($_REQUEST['req']) // селектор запросов
{
	case 'users': // выборка актуальных пользователей (usr_flag_archive = 0)
		$sql = 'SELECT usr_id AS id, usr_name AS name, usr_passwd AS passwd, eml_name AS email, eml_flag_confirmed AS confirmed
			FROM user 
			LEFT JOIN email ON usr_id = eml_usr_id 
			WHERE usr_flag_archive = 0 AND eml_flag_primary = 1
			ORDER BY usr_name';
	break;
	
	case 'users_all': // выборка всех пользователей базы
		$sql = 'SELECT usr_id AS id, usr_name AS name, usr_passwd AS passwd, eml_name AS email, usr_flag_archive AS archive, eml_flag_confirmed AS confirmed 
			FROM user 
			LEFT JOIN email ON usr_id = eml_usr_id 
			WHERE eml_flag_primary = 1
			ORDER BY usr_name';
	break;

	case 'save': // сохранение данных формы
		$sql = 'INSERT INTO user(usr_name, usr_passwd) VALUES("'.urldecode($_REQUEST['name']).'", "'.$_REQUEST['password1'].'")';
		
		if (!$mysqli->query($sql)) // если ошибка добавления
		{
			exit_req(array('status'=>'fail', 'msg'=>'user insert fail', 'sql'=>$sql));
		}

		$id = $mysqli->insert_id;

		if (!$mysqli->query('INSERT INTO email(eml_usr_id, eml_name) VALUES("'.$id.'", "'.urldecode($_REQUEST['email']).'")'))
		{
			// если была ошибка добавления email, то откатываем добавление нового пользователя
			$mysqli->query('DELETE FROM user WHERE usr_id = '.$id); // 
			exit_req(array('status'=>'fail', 'msg'=>'email insert fail'));
		}
		
		exit_req(array('status'=>'ok', 'msg'=>'user created', 'id'=>$id));
		
	break;

	case 'del': // удаление пользователя - установление флага "архивный"
	
		$ids = str_replace('_', ' OR usr_id = ', $_REQUEST['ids']); // формирование строки условий по id из параметра запроса
		
		$sql = 'UPDATE user SET usr_flag_archive=1 WHERE usr_id = '.$ids;

		if (!$mysqli->query($sql))
		{
			exit_req(array('status'=>'fail', 'msg'=>'user delete fail', 'sql'=>$sql));
		}

		exit_req(array('status'=>'ok', 'msg'=>'user(s) deleted'));
		
	break;

	default: // неизвестный идентификатор запроса 
		exit_req(array('status'=>'fail', 'msg'=>'bad req id'));
}

$res = $mysqli->query($sql); // выборка таблицы

if($res)
{
	$table = array();
	$i = 0;
	
	while ($row = $res->fetch_assoc()) {
		$table[$i++] = $row;
	}
	
	$res->free();
	
	
	$reply = array('req'=>$_REQUEST['req'], 'status'=>'ok', 'data'=>$table);
	
	exit_req($reply);
}
else
{
	exit_req(array('status'=>'fail', 'msg'=>'users fetch fail'));
}	

//----------------------------------------------------------------------
function exit_req($reply)
{
	global $mysqli;
	
	echo json_encode($reply);
	$mysqli->close();
	exit();
}

?>
