// Give alert and link to login
var showLoginAlert = function () {
  deleteOneCookie("x-access-token");
  deleteAllCookies();
  var body = "<div class='alert alert-danger alert-dismissable fade in'>" + 
  "<a ref='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
  "<strong>Failed to the authenticate user!</strong> Please click " +
  "<a href='/views/login' class='alert-link'><i>link to Log In...</i></a>" +
  "</div>"
  return body;
};

// Give warning error input message
var showWarningMessage = function (error) {
  var body = "<div class='alert alert-warning alert-dismissable fade in'>" + 
  "<a ref='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
  "<strong>Invalid Input!</strong> Error message: " + error +
  "</div>"
  return body;
};