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

// Click Button to Update Coupon
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
      valid: $('#update-valid').val(),
      couponType: $('#update-couponType').val(),
      salesCode: $('#update-salesCode').val()
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
        location.reload();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if(XMLHttpRequest.status === 403) {
          $('#updateCouponForm').append(showLoginAlert());
        }
      }
    });
    event.preventDefault();
  });
});

// Click Button to Add Coupon
$(document).ready(function(){
  $('#addCouponForm').submit(function( event ) {
    var postUrl = "../../api/v1/coupons/";

    var mobile = parseInt($("#add-couponCode").val());
    var couponRule = {
      type: $('#add-coupon-rule-type').val(),
      value: parseInt($('#add-coupon-rule-value').val())
    };
    var rebateRule = {
      type: $('#add-rebate-rule-type').val(),
      value: parseInt($('#add-rebate-rule-value').val())
    };

    var data = {
      mobile: mobile,
      username: $('#add-username').val(),
      couponRule: couponRule,
      rebateRule: rebateRule,
      valid: $('#add-valid').val(),
      couponType: $('#add-couponType').val(),
      salesCode: $('#add-salesCode').val()
    };

    console.log(data);
    $.ajax({
      type: "POST",
      url: postUrl,
      data: JSON.stringify(data),
      contentType: "application/json",
      beforeSend: function(xhr)
      {
        xhr.setRequestHeader('x-access-token', getCookieByName('x-access-token'));
      },
      success: function(data, textStatus, xhr)
      {
        alert("Have create coupen for mobile: " + mobile);
        location.reload();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if(XMLHttpRequest.status === 403) {
          $('#addCouponForm').append(showLoginAlert());
        } else if(XMLHttpRequest.status === 406) {
          $('#addCouponForm').append(showWarningMessage(JSON.parse(XMLHttpRequest.responseText).message));
        }
      }
    });
    event.preventDefault();
  });
});
