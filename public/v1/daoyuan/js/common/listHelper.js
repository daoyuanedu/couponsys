// Will send GET request to get coupons
var getCouponList = function (getUrl) {
  $.ajax({
    type: "GET",
    url: getUrl,
    contentType: "application/json",
    beforeSend: function (xhr)
    {
      xhr.setRequestHeader('x-access-token', getCookieByName('x-access-token'));
    },
    success: function (data, textStatus, xhr)
    {
      generateCouponList(data);
      $('#couponList').show();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      if(XMLHttpRequest.status === 403) {
        $('.couponTitle').append(showLoginAlert());
      }
    }
  });
};

// Generate Coupon List by response data
// GET /coupons/
var generateCouponList = function (couponList) {
  var listBody = "";
  couponList.forEach(function (coupon) {

    if (coupon.valid === false){
      listBody += "<li class='list-group-item list-group-item-danger'>";
    } else if (coupon.couponType === 'SALES') {
      listBody += "<li class='list-group-item list-group-item-info'>";
    } else{
      listBody += "<li class='list-group-item'>";
    }
    listBody +=
    "<a class='coupon-li-link-coupon' href='/views/coupons/" + coupon.couponID +"'><h4>"+ coupon.couponID + "</h4></a>" +
    "<h4 class='coupon-li-valid'>" + coupon.valid + "</h4>" +
    "<h4 class='coupon-li-valid'>" + coupon.couponType + "</h4>" +
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

// Generate Coupon List by response data
// GET coupons/orders/
// GET coupons/:CouponCode/orders/
var generateOrderList = function (orderList) {
  var listBody = "";
  $('.orderList-element').remove();

  orderList.orders.forEach(function (order) {
    if(order.rebated === false) {
      listBody += "<li class='list-group-item list-group-item-warning orderList-element'>";
    } else {
      listBody += "<li class='list-group-item orderList-element'>";
    }

    listBody +=
    "<a class='order-li-link-coupon' href='/views/coupons/" + order.couponID +"'><h4 class='order-li-coupon'>"+ order.couponID + "</h4></a>" +
    "<h4 class='order-li-rebated'>" + order.rebated + "</h4>" +
    "<h4 class='order-li-rebateValue'>" + order.rebateValue + "</h4>" +
    "<br>"
    ;

    listBody +=
    "<h5 class='order-li-orderValue'>" + order.orderValue.original + " <span class='glyphicon glyphicon glyphicon-arrow-right'></span> " + order.orderValue.final + "</h5>" +
    "<a class='order-li-link-orderID' href='/views/orders/" + order.orderID + "'><h5 class='order-li-orderID'>" + order.orderID + "</h5></a>" +
    "<h5 class='order-li-updateTime'>" + order.updatedAt.substring(0, 10) + "</h5></li>"
    ;

    if (hasInput(order.salesRef)) {
      if (order.salesRef.rebated  === false){
        listBody += "<li class='list-group-item list-group-item-danger orderList-element'>";
      } else {
        listBody += "<li class='list-group-item orderList-element'>";
      }
      listBody +=
      "<a class='order-li-saleref-salesCode' href='/views/coupons/" + order.salesRef.salesCode + "'><h4>" + "<span class='glyphicon glyphicon-import'></span>  " + order.salesRef.salesCode + "</h4></a>" +
      "<h4 class='order-li-saleref-rebated'>" + order.salesRef.rebated + "</h4>" +
      "<h4 class='order-li-saleref-rebateValue'>" + order.salesRef.rebateValue + "</h4></li>"
      ;
    }
  });
  $('#orderList-title').after(listBody);
}
