// Modify header login info basid on the cookie
$(document).ready(function(){
	if (getCookieByName('x-access-token') === null || getCookieByName('x-access-token') ==='') {
		$('#loginHeader').html(
			"<a href='/views/login'><span class='glyphicon glyphicon-user'></span> Log In / Out </a>"
		);
	} else {
		$('#loginHeader').html(
			"<a href='/views/login'><span class='glyphicon glyphicon-user'></span> Welcome Admin </a>"
		);
	}
});