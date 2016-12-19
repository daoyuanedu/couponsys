// ------------- Function JS -----------------

$(document).ready(function (){
  // Click login button to get token if the user is admin

  $('#login-action').submit(function (event) {
    var loginUrl = "../../api/v1/coupons/login";
    $.ajax({
      type: "POST",
      url: loginUrl,
      data: $('#login-action').serialize(),
      success: function (data)
      {
        var token = data.token;
        if(getCookieByName('x-access-token') !== token) {
          document.cookie = 'x-access-token=' + token;
        }
        console.log(document.cookie);
        hasLoggedinAndNeedLogout();
        location.replace(document.referrer);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
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

// Click sign out button to log out
$(document).ready(function (){
  $('#logout-action').click(function () {
    deleteOneCookie("x-access-token");
    deleteAllCookies();
    hasloggedoutAndNeedLogin();
  });
});
