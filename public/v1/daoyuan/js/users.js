// ------------- Function JS -----------------

// Click Search button to search special CouponCode
$(document).ready(function(){
  $("#userSearch").click(function(){
    var username = $("#userSearchInput").val();
    var currentUrl = window.location.pathname;
    var targetUrl = currentUrl + '/' + username;

    if (username === '' ) alert("Please Input Username");
    else window.location.href = targetUrl;
  });
});

// ------------- UI JS -----------------
