// ------------- Function JS -----------------

// Click Search button to search special CouponCode
$(document).ready(function(){
    $("#orderSearch").click(function(){
    	var order = $("#orderSearchInput").val();
    	var currentUrl = window.location.pathname;
    	var targetUrl = currentUrl + '/' + order;
    	window.location.href = targetUrl;
    });
});

// ------------- UI JS -----------------
