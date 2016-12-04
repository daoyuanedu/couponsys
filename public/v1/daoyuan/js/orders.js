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
