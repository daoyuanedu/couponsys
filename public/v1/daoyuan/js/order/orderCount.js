$(function(){
	$('#slide-submenu').on('click',function() {			        
        $(this).closest('.list-group').fadeOut('slide',function(){
        	$('.mini-submenu').fadeIn();	
        });
        $('#order-list-details').removeClass('col-md-9').addClass('col-md-12');
        $('#order-count-details').removeClass('col-md-3').addClass('col-md-2');

        
      });

	$('.mini-submenu').on('click',function(){		
        $(this).next('.list-group').toggle('slide');
        $('.mini-submenu').hide();
        $('#order-list-details').removeClass('col-md-12').addClass('col-md-9');
        $('#order-count-details').removeClass('col-md-2').addClass('col-md-3');
	})
})

var searchOrderList = function() {
  $('#searchOrderForm').submit(function (event) {
    var couponCode = $("#filter-couponCode").val();
    var orderURL = hasCouponCodeAsURL(couponCode);

    var couponType = hasTypeOption($("#filter-coupenType").val());
    var rebated = rebatedOption($("#filter-rebate").val());
    var since = hasInput($("#filter-since").val());
    var until = hasInput($("#filter-until").val());

    var data = {
      filter: couponType,
      rebated: rebated,
      since: since,
      until: until
    };

    $.ajax({
      type: "GET",
      url: orderURL,
      data: serialize(data),
      contentType: "application/json",
      beforeSend: function(xhr)
      {
        xhr.setRequestHeader('x-access-token', getCookieByName('x-access-token'));
      },
      success: function (data, textStatus, xhr)
      {
        generateOrderList(data);
        generateOrderSummary(data)
        $('#orderList').show();
        addCheckBox();
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        if(XMLHttpRequest.status === 403) {
          $('#searchOrderForm').append(showLoginAlert());
        } else if(XMLHttpRequest.status === 406) {
          $('#searchOrderForm').append(showWarningMessage(JSON.parse(XMLHttpRequest.responseText).message));
        }
      }
    });

    event.preventDefault();
  });
}

var generateOrderSummary = function(orderList) {
  var orderNumber = 0; //全部订单数
  var totalOrderCount = 0; // 全部销售金额
  var totalDiscountOrderCount = 0; // 全部折扣后金额

  var dirRebateOrderNumber = 0; // 直接已返现订单数
  var dirRebateOrderCount = 0; // 直接已返现订单总金额
  var dirNoRebateOrderNumber = 0; // 直接未返现订单数
  var dirNoRebateOrderCount = 0; // 直接未支付总金额
  var dirRebateCount = 0; // 全部直接返现总金额

  var saleRebateOrderNumber = 0; // 销售已返现订单数
  var saleRebateOrderCount = 0; // 销售已返现订单总金额
  var saleNoRebateOrderNumber = 0; // 销售未返现订单数
  var saleNoRebateOrderCount = 0; // 销售未支付总金额
  var saleRebateCount = 0; // 销售返现总金额
  var saleRebateNumber = 0; // 销售返现总订单数

  orderList.orders.forEach(function (order) {
     // Total calculation
     orderNumber ++;
     totalOrderCount += order.orderValue.original;
     totalDiscountOrderCount += order.orderValue.final;

     // Dir calculation
     dirRebateCount += order.rebateValue;
     if (order.rebated == true) {
      dirRebateOrderNumber ++;
      dirRebateOrderCount += order.rebateValue; 
     } 

     if (order.rebated == false) {
      dirNoRebateOrderNumber ++;
      dirNoRebateOrderCount += order.rebateValue;
     }

     // Sales calculation
     if (hasInput(order.salesRef)) {
        saleRebateNumber ++;
        saleRebateCount += order.salesRef.rebateValue;

        if (order.salesRef.rebated  === true) {
          saleRebateOrderNumber ++;
          saleRebateOrderCount += order.salesRef.rebateValue;
        }

        if (order.salesRef.rebated  === false) {
          saleNoRebateOrderNumber ++;
          saleNoRebateOrderCount += order.salesRef.rebateValue;
        }
     }
  });

  // All CouponOrder
  $('#sum-orderNumber').text(orderNumber);
  $('#sum-totalOrderCount').text(totalOrderCount);
  $('#sum-totalDiscountOrderCount').text(totalDiscountOrderCount);
  // Dir CouponOrder
  $('#sum-dirRebateCount').text(dirRebateCount);
  $('#sum-dirRebateOrderNumber').text(dirRebateOrderNumber);
  $('#sum-dirRebateOrderCount').text(dirRebateOrderCount);
  $('#sum-dirNoRebateOrderNumber').text(dirNoRebateOrderNumber);
  $('#sum-dirNoRebateOrderCount').text(dirNoRebateOrderCount);
  // Sale CouponOrder
  $('#sum-saleRebateNumber').text(saleRebateNumber);
  $('#sum-saleRebateCount').text(saleRebateCount);
  $('#sum-saleRebateOrderNumber').text(saleRebateOrderNumber);
  $('#sum-saleRebateOrderCount').text(saleRebateOrderCount);
  $('#sum-saleNoRebateOrderNumber').text(saleNoRebateOrderNumber);
  $('#sum-saleNoRebateOrderCount').text(saleNoRebateOrderCount);
}