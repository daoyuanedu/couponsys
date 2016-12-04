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
      event.preventDefault();
      var rebateItems = [], counter = 0;
      $("#orderList-ul li.forRebate").each(function(idx, li) {
        rebateItems[counter] = creatUpdateOrder(li);
        counter++;
      });
      console.log (rebateItems);
    });
  });
}

var creatUpdateOrder = function(li) {
  var order = {};
  order.couponCode = $(li).find(".order-li-coupon").text();
  order.orderID = $(li).find(".order-li-link-orderID").text();
  order.rebated = $(li).find(".order-li-rebated").text();
  order.rebateValue = $(li).find(".order-li-rebateValue").text();
  return order;
}
