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

// Modify couponList show or hide basid on the cookie
$(document).ready(function(){
	if (getCookieByName('x-access-token') === null || getCookieByName('x-access-token') ==='') {
		$('#couponList').hide();
	} else {
		$('#couponList').show();
	}
});

// function to get couponList

$(document).ready(function(){
  $('#').click(function( event ) {
    var getUrl = "../../api/v1/coupons/";
    $.ajax({
      type: "Get",
      url: getUrl,
      contentType: "application/json",
      beforeSend: function(xhr)
      {
        xhr.setRequestHeader('x-access-token', getCookieByName('x-access-token'));
      },
      success: function(data, textStatus, xhr)
      { 
        location.reload();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if(XMLHttpRequest.status === 403) {
          $('#deleteCouponForm').append(showLoginAlert());
        }
      }
    });
    event.preventDefault();
  });
});

// ------------- UI JS -----------------
