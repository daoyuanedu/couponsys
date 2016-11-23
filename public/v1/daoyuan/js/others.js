// ------------- Function JS -----------------

// Click login button to get token if the user is admin
$(document).ready(function(){
  $('#login-action').submit(function( event ) {
    var loginUrl = "../api/v1/coupons/login";
    $.ajax({
      type: "POST",
      url: loginUrl,
      data: $('#login-action').serialize(),
      success: function(data)
      {
        var token = data.token;
        document.cookie = 'x-access-token=' + token;
        $("#logInfo").html(
        "<h2 id='logInfo'>Welcome Amdin</h2>"
        );
        alert('Get Cookie: ' + getCookieByName('x-access-token'));
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $("#logInfo").html(
        "<h2 id='logInfo'>Wrong Amdin</h2>"
        );
        alert("Not found this admin user");
      }
    });
    event.preventDefault();
  });
});

// Click sign up button to sign up
$(document).ready(function(){
  $('#logout-action').click(function() {
    document.cookie = 'x-access-token='
    $("#logInfo").html(
      "<h2 id='logInfo'>Please Log In</h2>"
    );
    alert('Cookie x-access-token has been removed: ' + getCookieByName('x-access-token'));
  });
});

//  Use below in request to send token
//        beforeSend: function(xhr)
//        {
//           xhr.setRequestHeader('x-access-token', getCookie('x-access-token'));
//        },