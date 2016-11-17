// ------------- Function JS -----------------

// Click Search button to search special CouponCode
$(document).ready(function(){
    $("#userSearch").click(function(){
    	var username = $("#userSearchInput").val();
    	var currentUrl = window.location.pathname;
    	var targetUrl = currentUrl + '/' + username;
    	window.location.href = targetUrl;
    });
});

// ------------- UI JS -----------------
