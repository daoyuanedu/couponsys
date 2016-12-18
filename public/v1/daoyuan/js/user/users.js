// ------------- Function JS -----------------

// Click Search button to search special CouponCode
$(document).ready(function (){
  $("#userSearch").click(function (){
    var username = $("#userSearchInput").val();
    //var currentUrl = window.location.pathname;
    //var targetUrl = currentUrl + '/' + username;

    if (username === '' )  {
      $('.userTitle').append(showWarningMessage("Please Input Username"));
    } else {
      var getUrl = "../../api/v1/coupons/users/" + username;
      getCouponListByUsername(getUrl);
    }
  });
});


// Will send GET request to get coupons
var getCouponListByUsername = function (getUrl) {
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
      if (data.coupons.length !== 0) {
        $('#couponList-title').nextAll('.list-group-item').remove();
        generateCouponList(data.coupons);
      } else {
        $('.userTitle').append(showWarningMessage("No Coupons Found for this user"));
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      if (XMLHttpRequest.status === 403) {
        $('.userTitle').append(showLoginAlert());
      }
    }
  });
};
// ------------- UI JS -----------------
