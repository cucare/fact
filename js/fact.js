//======================================================================


//======================================================================
$(function(){
	
	$("#user-del").on('click', function(e){
		
		
		$.ajax({
			url: "ajax.php",
			data: "req=del",
			dataType: "json",
			success: function(response){
				
				for(var i in response.data)
				{
					var row = response.data[i];
					
					//alert(JSON.stringify(response.data[i]));
					
					$('#users tbody').append('<tr data-user-id="'+row.id+'"><td>'+row.name
						+'</td><td>'+row.passwd+'</td><td>'+row.email+'</td><td><input type="checkbox" /></td><tr>');
				}
							
			}
		});	

		
		
	});
	
});

//======================================================================
function get_users(mode)
{
	var req = 'users_all';
	
	if(typeof mode === 'undefined') req = 'users';
	
	$.ajax({
		url: "ajax.php",
		data: "req="+req,
		dataType: "json",
		success: function(response){
			  
			for(var i in response.data)
			{
				var row = response.data[i];
				
				//alert(JSON.stringify(response.data[i]));
				
				var $tr = $('<tr data-user-id="'+row.id+'"><td>'+row.name
					+'</td><td>'+row.passwd+'</td><td class="email">'+row.email+'</td><td class="check"><input type="checkbox" /></td><tr>');
				
				if(row.archive == 1) $tr.addClass('user-archive');
				if(row.confirmed == 0) $tr.find('td.email').addClass('email-not-confirmed');
				
				$('#users tbody').append($tr);

			}
                          
		}
	});	
}

//======================================================================
$(document).ready(function(){ 
	//alert('ready'); 
	
	get_users('all');
	
	
});
