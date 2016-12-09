// ------------- Function JS -----------------

// Click Search button to search orders
$(document).ready(function(){
  searchOrderList();
});

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
  var orderNumber = 0; 
  var totalOrderCount = 0;
  var totalDiscountOrderCount = 0;

  var dirRebateOrderNumber = 0;
  var dirRebateOrderCount = 0;
  var dirNoRebateOrderNumber = 0;
  var dirNoRebateOrderCount = 0;
  var dirRebateCount = 0;

  orderList.orders.forEach(function (order) {
     orderNumber ++;
     totalOrderCount += order.orderValue.original;
     totalDiscountOrderCount += order.orderValue.final;
     dirRebateCount += order.orderValue.original - order.orderValue.final;

     if (order.rebated == true) {
      dirRebateOrderNumber ++;
      dirRebateOrderCount += order.rebateValue; 
     } 

     if (order.rebated == false) {
      dirNoRebateOrderNumber ++;
      dirNoRebateOrderCount += order.rebateValue;
     }
  });

  console.log(orderNumber + " Order:" 
    + totalOrderCount + " " 
    + totalDiscountOrderCount + " " 
    + dirRebateCount + " Rebate:" 
    + dirRebateOrderNumber + " " 
    + dirRebateOrderCount + " "
    + dirNoRebateOrderNumber + " NoRebate:"
    + dirNoRebateOrderCount + " "
  );
}
// ------------- UI JS -----------------

// Order Search Calendar UI
$(document).ready(function (){
  $(function () {
    $('#filter-since').datetimepicker({
      format: 'YYYY-MM-DD',
    });
    $('#filter-until').datetimepicker({
      useCurrent: false ,
      format: 'YYYY-MM-DD'
    });
    $("#filter-since").on("dp.change", function (e) {
      $('#filter-until').data("DateTimePicker").minDate(e.date);
    });
    $("#filter-until").on("dp.change", function (e) {
      $('#filter-since').data("DateTimePicker").maxDate(e.date);
    });
  });
});
