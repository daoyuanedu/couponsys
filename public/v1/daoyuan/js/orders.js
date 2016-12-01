// ------------- Function JS -----------------

// Click Search button to search orders
$(document).ready(function(){
  $('#searchOrderForm').submit(function( event ) {
    var couponCode = parseInt($("#filter-couponCode").val());
    var orderURL = hasCouponCodeURL(couponCode);

    var couponType = hasTypeOption($("#filter-coupenType").val());
    var rebated = rebatedOption($("#filter-rebate").val());
    var since = hasInput($("#filter-since").val());
    var until = hasInput($("#filter-until").val());

    var data = {
      rebated: rebated,
      since: since,
      until: until
    };

    console.log(data);
    $.ajax({
      type: "GET",
      url: orderURL,
      data: JSON.stringify(data),
      contentType: "application/json",
      beforeSend: function(xhr)
      {
        xhr.setRequestHeader('x-access-token', getCookieByName('x-access-token'));
      },
      success: function(data, textStatus, xhr)
      {
        console.log(data)
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if(XMLHttpRequest.status === 403) {
          $('#searchOrderForm').append(showLoginAlert());
        } else if(XMLHttpRequest.status === 406) {
          $('#searchOrderForm').append(showWarningMessage(JSON.parse(XMLHttpRequest.responseText).message));
        }
      }
    });

    event.preventDefault();
  });
});

var hasCouponCodeURL = function (couponCode) {
  if (hasInput(couponCode)) {
    return "../../api/v1/coupons/"+ couponCode + "/orders";
  } else {
    return "../../api/v1/coupons/orders";
  }
}

var hasTypeOption = function (InputType) {
  if(InputType === 'all') {
    return 'all';
  } else if(InputType === 'direct') {
    return 'direct';
  } else if(InputType === 'salesref') {
    return 'salesref';
  } else {
    return null;
  }
}

var rebatedOption = function (InputRebate) {
  if(InputRebate === 'all') {
    return 'all';
  } else if(InputRebate === 'rebated') {
    return true;
  } else if(InputRebate === 'need rebated') {
    return false;
  } else {
    return null;
  }
}
// ------------- UI JS -----------------

// Order Search Calendar UI
$(document).ready(function(){
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
