// Modify header login info basid on the cookie
$(document).ready(function(){
	if (getCookieByName('x-access-token') === null || getCookieByName('x-access-token') === ''
  	|| typeof getCookieByName('x-access-token') === 'undefined')
  	 {
    // Need More function for this;
    // alert("Please Log In");
    $("#login-action").show();
    $('#loginHeader').html(
			"<a href='/views/login'><span class='glyphicon glyphicon-user'></span> Log In / Out </a>"
		);
  } else {
    $("#login-action").hide();
    $("#logInfo").html(
      "<h2 id='logInfo'>Welcome Admin</h2>"
    );
    $('#loginHeader').html(
			"<a href='/views/login'><span class='glyphicon glyphicon-user'></span> Welcome Admin </a>"
		);
  }
});