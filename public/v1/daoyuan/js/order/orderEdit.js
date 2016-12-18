var addCheckBox = function() {
  $(function () {
    $('.list-group.checked-list-box .orderList-element').each(function () {

      // Settings
      var $widget = $(this),
      $checkbox = $('<input type="checkbox" class="hidden" />'),
      settings = {
        on: {
          icon: 'glyphicon glyphicon-check'
        },
        off: {
          icon: 'glyphicon glyphicon-unchecked'
        }
      };

      $widget.css('cursor', 'pointer')

      $widget.append($checkbox);      

      // Event Handlers
      $widget.on('click', function () {
        $checkbox.prop('checked', !$checkbox.is(':checked'));
        $checkbox.triggerHandler('change');
        updateDisplay();
      });
      $checkbox.on('change', function () {
        updateDisplay();
      });

      // Actions
      function updateDisplay() {
        var isChecked = $checkbox.is(':checked');

        // Set the button's state
        $widget.data('state', (isChecked) ? "on" : "off");

        // Set the button's icon
        $widget.find('.state-icon')
        .removeClass()
        .addClass('state-icon ' + settings[$widget.data('state')].icon);

        if (isChecked) {
          $widget.addClass('forRebate');
        } else {
          $widget.removeClass('forRebate');
        }
      }

      // Initialization
      function init() {
        if ($widget.data('checked') == true) {
          $checkbox.prop('checked', !$checkbox.is(':checked'));
        }
        updateDisplay();
        $widget.append('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');

      }
      init();
    });

    $('#get-checked-data').on('click', function(event) {
      var rebateItems = [], counter = 0;
      $("#orderList-ul li.forRebate").each(function(idx, li) {
        rebateItems[counter] = creatUpdateOrder(li);
        counter++;
      });

      multiUpdateOrder(rebateItems);
    });

    function creatUpdateOrder(li) {
      var order = {};
      order.couponCode = $(li).find(".order-li-coupon").text();
      order.orderID = $(li).find(".order-li-link-orderID").text();
      order.rebated = $(li).find(".order-li-rebated").text();
      order.rebateValue = $(li).find(".order-li-rebateValue").text();
      return order;
    }
  });
}

var multiUpdateOrder = function (multiItems) {
  for (item in multiItems) {
    multiItems[item] = modifyOrderItem(multiItems[item]);
    orderValueUpdate(multiItems[item])
  }
}

var orderValueUpdate = function(item) {
  var putUrl = "../../api/v1/coupons/" + item.couponCode + '/orders/' + item.orderID;

  var data = {
    rebated : item.rebated,
    rebateValue : item.rebateValue
  }
  var data  = serialize(data);

  $.ajax({
    type: "PUT",
    url: putUrl + "?" + data ,
    beforeSend: function (xhr)
    {
      xhr.setRequestHeader('x-access-token', getCookieByName('x-access-token'));
    },
    success: function (data, textStatus, xhr)
    { 
      $('#btn-filter-search').click();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
    },
    complete: function() {
    //...
    } 
  });
}

var modifyOrderItem = function (item) {
  var rebated = item.rebated;
  if (item.rebated === 'false') {
    item.rebated = "true";
  } else {
    item.rebated = "false"
    item.rebateValue = item.rebateValue.split(" ")[0];
  }
  return item;
}
