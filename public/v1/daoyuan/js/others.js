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
        alert('Get Cookie: ' + getCookie('x-access-token'));
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Not found this admin user");
      }
    });
    event.preventDefault();
  });
});

// Click sign up button to sign up
$(document).ready(function(){
  $('#signup-action').click(function() {
    document.cookie = 'x-access-token='
    alert('Cookie x-access-token has been removed: ' + getCookie('x-access-token'));
    // $.ajax({
    //        type: "GET",
    //        url: getCouponsUrl,
    //        beforeSend: function(xhr)
    //        {
    //           xhr.setRequestHeader('x-access-token', getCookie('x-access-token'));
    //        },
    //        success: function(data)
    //        {
    //        }
    //      });
  });
});
// Get cookie by name

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length,c.length);
    }
  }
  return "";
}
