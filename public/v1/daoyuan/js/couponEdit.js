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
      contentType: "application/json",
      beforeSend: function(xhr)
      {
        xhr.setRequestHeader('x-access-token', getCookieByName('x-access-token'));
      },
      success: function(data, textStatus, xhr)
      { 
        alert("Have delete coupen: " + couponID);
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

// Click Button to delete Coupon

$(document).ready(function(){
  $('#updateCouponForm').submit(function( event ) {
    var couponID = $("#update-couponCode").val();
    var putUrl = "../../api/v1/coupons/" + couponID;

    var couponRule = {
      type: $('#update-coupon-rule-type').val(),
      value: parseInt($('#update-coupon-rule-value').val())
    };
    var rebateRule = {
      type: $('#update-rebate-rule-type').val(),
      value: parseInt($('#update-rebate-rule-value').val())
    };

    var data = {
     username: $('#update-username').val(),
     couponRule: couponRule,
     rebateRule: rebateRule,
     valid: $('#update-valid').val()
    };
    
    console.log(data);
    $.ajax({
      type: "PUT",
      url: putUrl,
      data: JSON.stringify(data),
      contentType: "application/json",
      beforeSend: function(xhr)
      {
        xhr.setRequestHeader('x-access-token', getCookieByName('x-access-token'));
      },
      success: function(data, textStatus, xhr)
      { 
        alert("Have updated coupen: " + couponID);
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