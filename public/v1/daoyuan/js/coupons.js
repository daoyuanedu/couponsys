// ------------- Function JS -----------------

// Click Search button to search special CouponCode
$(document).ready(function(){
  $("#couponSearch").click(function(){
    var couponCode = $("#couponSearchInput").val();
    var currentUrl = window.location.href;
    var targetUrl = currentUrl + '/' + couponCode;

    if (couponCode === '' ) alert("Please Input CouponCode");
    else window.location.href = targetUrl;
  });
});


// TODO Click eidt button to edit special CouponCode
$(document).ready(function(){
  $(".couponItemButton").click(function(){
    // var couponCode = $("#couponItem").val();
    // alert(couponCode + "--");
    // var currentUrl = window.location.href;
    // var targetUrl = currentUrl + '/' + couponCode;
    // if (couponCode === '' ) alert("Please Input CouponCode");
    // else window.location.href = targetUrl;
  });
});

// ------------- UI JS -----------------
