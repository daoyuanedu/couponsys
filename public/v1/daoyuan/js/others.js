// ------------- Function JS -----------------

// Click login button to get token if the user is admin
$(document).ready(function(){
    $('#login-action').submit(function( event ) {
    var loginUrl = "../api/v1/login"; 
    $.ajax({
           type: "POST",
           url: loginUrl,
           data: $('#login-action').serialize(),
           success: function(data)
           {
               alert(data);
           },
           error: function(XMLHttpRequest, textStatus, errorThrown) {
               alert("Not found this admin user");
           }
         });
    	event.preventDefault();
	  });
});