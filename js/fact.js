//======================================================================


//======================================================================
$( function() {
	
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

		
		
	} );
	
    function refreshSwatch() {
		
      var red = cc($( "#red" ).slider( "value" )),
        green = cc($( "#green" ).slider( "value" )),
        blue = cc($( "#blue" ).slider( "value" ));
        
        message = "980079"+red+green+blue;
        ready_message = true;
    }
 
    $( "#red, #green, #blue" ).slider({
      orientation: "horizontal",
      range: "min",
      min: 0,
      max: 255,
      step: 1,
      //value: 50,
      slide: refreshSwatch,
      change: refreshSwatch
    });
    
    $( "#red" ).slider( "value", 2 );
    $( "#green" ).slider( "value", 0 );
    $( "#blue" ).slider( "value", 1 );
  } 
);

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
