// ------------- Function JS -----------------

// Click Search button to search special CouponCode
$(document).ready(function(){
    $("#orderSearch").click(function(){
    	var order = $("#orderSearchInput").val();
    	var currentUrl = window.location.pathname;
    	var targetUrl = currentUrl + '/' + order;

    	if (order === '' ) alert("Please Input CouponCode");
    	else window.location.href = targetUrl;
    });
});

// ------------- UI JS -----------------
