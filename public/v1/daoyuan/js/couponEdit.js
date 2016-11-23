// ------------- Function JS -----------------

// Click Button to delete Coupon

$(document).ready(function(){
  $('#deleteCouponForm').submit(function( event ) {
    var couponID = $("#delete-couponCode").val();
    var deleteUrl = "../../api/v1/coupons/" + couponID;
    $.ajax({
      type: "Delete",
      url: deleteUrl,
      data: $('#deleteCouponForm').serialize(),
      beforeSend: function(xhr)
      {
        xhr.setRequestHeader('x-access-token', getCookieByName('x-access-token'));
      },
      success: function(data, textStatus, xhr)
      {
        console.log(xhr.status + getCookieByName('x-access-token'));
        location.reload();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if(XMLHttpRequest.status === 403) {
          alert("Please Login");
          //location.replace('/views/login/');
        }
        console.log(XMLHttpRequest.status);
      }
    });
    event.preventDefault();
  });
});