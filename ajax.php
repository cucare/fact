<?php

$mysqli = new mysqli('localhost', 'fact_user', 'fact123', 'fact');


if ($mysqli->connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	exit();
}


switch($_REQUEST['req'])
{
	case 'users':
		$sql = "SELECT usr_id AS id, usr_name AS name, usr_passwd AS passwd, eml_name AS email, eml_flag_confirmed AS confirmed
			FROM user 
			LEFT JOIN email ON usr_id = eml_usr_id 
			WHERE usr_flag_archive = 0
			ORDER BY usr_name";
	break;
	
	case 'users_all':
		$sql = "SELECT usr_id AS id, usr_name AS name, usr_passwd AS passwd, eml_name AS email, usr_flag_archive AS archive, eml_flag_confirmed AS confirmed 
			FROM user 
			LEFT JOIN email ON usr_id = eml_usr_id 
			ORDER BY usr_name";
	break;

	default:
		$status = 'fail';
		$msg = 'invalid req';
		echo json_encode($reply);
		exit;
}

$res = $mysqli->query($sql);

$table = array();
$i = 0;

while ($row = $res->fetch_assoc()) {
	$table[$i++] = $row;
}

$res->free();
$mysqli->close();


$reply = array('req'=>$_REQUEST['req'], 'status'=>'ok', 'data'=>$table);

echo json_encode($reply);
