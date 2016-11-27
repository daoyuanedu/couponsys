// check the element that will be displayed
var validAttr = function(attribute) {
	if (typeof attribute === 'undefined' || attribute === '' || attribute === null) {
		return "empty / null";
	}
	return attribute;
};

// TODO: need to validate the user input