// ------------- Function JS -----------------

// Click Search button to search special CouponCode
$(document).ready(function(){
    $("#couponSearch").click(function(){
    	var couponCode = $("#couponSearchInput").val();
    	var currentUrl = window.location.href;
    	var targetUrl = currentUrl + '/' + couponCode;
    	window.location.href = targetUrl;
    });
});

// ------------- UI JS -----------------
