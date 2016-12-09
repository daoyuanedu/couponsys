// ------------- Function JS -----------------

// Click Search button to search special CouponCode
$(document).ready(function (){
  $("#couponSearch").click(function(){
    var couponCode = $("#couponSearchInput").val();
    var currentUrl = window.location.href;
    var targetUrl = currentUrl + '/' + couponCode;

    if (couponCode === '' ) {
      $('.couponTitle').append(showWarningMessage("Please Input CouponCode"));
    } else {
      window.location.href = targetUrl;
    }
  });
});

// Modify couponList get or hide basid on the cookie
$(document).ready(function (){
  if (getCookieByName('x-access-token') === null || getCookieByName('x-access-token') ==='') {
    $('#couponList').hide();
    $('#orderList').hide();
  } else {
    var currentUrl = window.location.pathname;
    if(currentUrl === '/views/coupons') {
      var getUrl = "../../api/v1/coupons/";
      getCouponList(getUrl);
    }
  }
});

// ------------- UI JS -----------------
