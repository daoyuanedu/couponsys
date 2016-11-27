// Will send GET request to get coupons
var getCouponList = function() {
  var getUrl = "../../api/v1/coupons/";
  $.ajax({
    type: "GET",
    url: getUrl,
    contentType: "application/json",
    beforeSend: function(xhr)
    {
      xhr.setRequestHeader('x-access-token', getCookieByName('x-access-token'));
    },
    success: function(data, textStatus, xhr)
    {
      generateCouponList(data);
      $('#couponList').show();
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      if(XMLHttpRequest.status === 403) {
        $('.couponTitle').append(showLoginAlert());
      }
    }
  });
};

// Generate Coupon List by response' data
var generateCouponList = function(CouponList) {
  console.log(CouponList);

  var listBody = "";
  CouponList.forEach(function(coupon) {
    listBody +=
    "<li class='list-group-item'>" +
    "<a class='coupon-li-link-coupon' href='/views/coupons/" + coupon.couponID +"'><h4>"+ coupon.couponID + "</h4></a>" +
    "<h4 class='coupon-li-link-valid'>" + coupon.valid + "</h4>" +
    "<h4 class='coupon-li-link-valid'>" + coupon.couponType + "</h5>" +
    "<a class='coupon-li-link-coupon'' href='/views/coupons/" + validAttr(coupon.salesCode) +"'><h4>"+ validAttr(coupon.salesCode) + "</h4></a>" +
    "<br>" +
    "<h5>" + validAttr(coupon.username) + "</h5>" +
    "<h5>" + coupon.couponRule.type + ": " + coupon.couponRule.value+ "</h5>" +
    "<h5>" + coupon.rebateRule.type + ": " + coupon.rebateRule.value+ "</h5>" +
    "<h5>" + (coupon.createdAt).substring(0, 10) +"</h5></li>"
    ;
  });
  $('#couponList-title').after(listBody);
};
