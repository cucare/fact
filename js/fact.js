$(function(){

	var email_ok = false, passws_ok = false; // флаги правильности ввода
	
	//------------------------------------------------------------------
	// форма ввода
    dialog = $( '#new_user' ).dialog({
      autoOpen: false,
      height: 400,
      width: 400,
      modal: true,
      buttons: {
        'Очистить': function() { 
			$('form')[ 0 ].reset(); // очистка полей
			$('#passwd_check').html('&nbsp;'); // удаление флажка пароля
		},
        'Закрыть': function() { dialog.dialog( 'close' ) },
        'Добавить': save_data 
      },
      close: function() { $('form')[ 0 ].reset() }
    });
    
	//------------------------------------------------------------------
	// сохранение данных формы
	function save_data()
	{
		if( !email_ok  ||  !passws_ok ) return false; // проверка правильности ввода
		
		var $form = $('#new_user form');    
		
		var params = $form.serialize();

		// запрос на сохранение
		$.ajax({
			url: 'ajax.php',
			data: 'req=save&'+params,
			dataType: 'json',
			success: function(response){ // если сервер не выдал ошибок 
				
				if(response.status == 'ok') // если пришли данные от базы, обновить таблицу
					get_users(response.id);
				else
					alert(response.msg); // вывод сообщения об ошибке
			},
			error: function(){ alert('save request error') }
		});	
		
	}
     
     
	//------------------------------------------------------------------
	// открытие формы
	$('#add_user').on('click', function(e){	dialog.dialog('open') });

	//------------------------------------------------------------------
	// удаление помеченных
	$('#user_del').on('click', function(e){
		
		var ids = '0';
		
		$('#users tr').each( function() // формирование набора id для удаления
		{
			var id = $(this).attr('data-user_id');
			
			if( $(this).find('input.chk').prop('checked') )  ids += '_'+id;
		});    

		// запрос на удаление
		$.ajax({
			url: 'ajax.php',
			data: 'req=del&ids='+ids,
			dataType: 'json',
			success: function(response)
			{
				if(response.status == 'ok')
						get_users(); // обновление таблицы 
				else
						alert(response.msg); // вывод сообщения об ошибке обработки запроса
			},
			error: function(){ alert('delete request error') }
		});	

		
		
	});
	
	//------------------------------------------------------------------
	// изменение режима вывода таблицы 
	$('#show_deleted').on('change', function(e)
	{
			get_users(); // обновление таблицы
	});

	//------------------------------------------------------------------
	var email_re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	
	$('#email').on('blur', function() // проверка правильности формата email
	{
		if ( !( email_re.test( $(this).val() ) ) )
		{
			$(this).addClass( "ui-state-error" ); // индикатор ошибки
			email_ok = false;
		}
		else
		{
			$(this).removeClass( "ui-state-error" ); // очистка индикатор ошибки
			email_ok = true;
		}
	});
	
	//------------------------------------------------------------------
	// проверка ввода пароля 
	$('#password1, #password2').on('keyup', function()
	{
		if( $('#password1').val().length == 0  &&  $('#password2').val().length == 0) // пустые поля - очистка индикатора
		{
			passws_ok = false;
			$('#passwd_check').html('&nbsp;');
		}
		else if( $('#password1').val() === $('#password2').val() ) // значения совпадают - тогда индикатор ок
		{
			passws_ok = true;
			$('#passwd_check').html('&check;').removeClass('check_fail').addClass('check_ok');
		}
		else // значения не совпадают
		{
			passws_ok = false;
			$('#passwd_check').html('&cross;').removeClass('check_ok').addClass('check_fail'); 
		}
	});

	//------------------------------------------------------------------
	$('input').on('keypress', function(e){ if(e.which == 13) return false; }); // блокировка перезагрузки страницы по <enter>
	
	//------------------------------------------------------------------
	get_users(); // по завершении загрузки страницы заполнение таблицы пользователей

    $('form')[ 0 ].reset(); // очистка полей формы от старых значений

});

//----------------------------------------------------------------------
// запрос данных для таблицы пользователей
function get_users(new_id)
{
	var req;

	if( $('#show_deleted').prop('checked') ) // проверка флага показа удаленных пользователей
		req = 'users_all'; // если выводить вместе с архивными
	else
		req = 'users'; // если нужны только актуальные
	
	// запрос данных таблицы 
	$.ajax({
		url: 'ajax.php',
		data: 'req='+req,
		dataType: 'json',
		success: function(response){
			
			$('#users tbody').html(''); // очистка таблицы
			  
			if( response.data.length == 0) // если выборка пуста
				$('#users tbody').append('<tr><td colspan="4" class="no_data"> ------------ нет данных для отображения ------------</td></tr>');
			
			for(var i in response.data) // по всем строкам выборки из базы
			{
				var row = response.data[i];
				
				// формирование строки и добавление ее к таблице
				var $tr = $('<tr data-user_id="'+row.id+'"><td>'+row.name
					+'</td><td>'+row.passwd+'</td><td class="email">'+row.email
					+'</td><td class="check"><input class="chk" type="checkbox" /></td><tr>');
				
				if(row.archive == 1) $tr.addClass('user_archive'); // выделение архивных
				if(row.confirmed == 0) $tr.find('td.email').addClass('email_not_confirmed'); // выделение неподтвержденных емейлов
				if(typeof new_id != 'undefined'  &&  row.id == new_id) $tr.addClass('new_row'); // выделение добавленного пользователя
				
				$('#users tbody').append($tr);

			}
                          
		},
		error: function(){ alert('fetch request error') }
	});	
}

//======================================================================
