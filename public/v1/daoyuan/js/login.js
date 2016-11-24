// ------------- Function JS -----------------

// Click login button to get token if the user is admin
$(document).ready(function(){
  if (getCookieByName('x-access-token') === null || getCookieByName('x-access-token') ==='') {
    // Need More function for this;
    // alert("Please Log In");
  }
  else {
    $("#login-action").hide();
    $("#logInfo").html(
      "<h2 id='logInfo'>Welcome Admin</h2>"
    );
  }
  $('#login-action').submit(function( event ) {
    var loginUrl = "../../api/v1/coupons/login";
    $.ajax({
      type: "POST",
      url: loginUrl,
      data: $('#login-action').serialize(),
      success: function(data)
      {
        var token = data.token;
        if(getCookieByName('x-access-token') != token) {
          document.cookie = 'x-access-token=' + token;
        }
        console.log(document.cookie);
        $("#logInfo").html(
          "<h2 id='logInfo'>Welcome Admin</h2>"
        );
        $("#login-action").hide();
        //location.replace(document.referrer);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $("#logInfo").html(
          "<h2 id='logInfo'>Wrong Amdin</h2>"
        );
        alert("Not found this admin user");
        console.log(document.cookie);
      }
    });
    event.preventDefault();
  });
});

// Click sign up button to sign up
$(document).ready(function(){
  $('#logout-action').click(function() {
    deleteOneCookie("x-access-token");
    $("#logInfo").html(
      "<h2 id='logInfo'>Please Log In</h2>"
    );
    $("#login-action").show();
    console.log(document.cookie);
  });
});
