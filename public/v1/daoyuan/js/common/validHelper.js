// check the element that will be displayed
var validAttr = function(attribute) {
	if (typeof attribute === 'undefined' || attribute === '' || attribute === null) {
		return "empty / null";
	}
	return attribute;
};

// TODO: need to validate the user input

var hasInput = function(input) {
	if (typeof input === 'undefined' || input === '' || input === null) {
		return null;
	}
	return input;
};

var hasCouponCodeAsURL = function (couponCode) {
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