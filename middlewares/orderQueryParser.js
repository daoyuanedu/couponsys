

exports.parseOrderFilters = function (req, res, next) {
  var rebated = req.query.rebated;
  if(typeof rebated !== 'undefined')
    req.orderRebated = rebated;

  var since = Date.parse(req.query.since);
  if(!isNaN(since))
    req.orderSince = new Date(since);

  var until = Date.parse(req.query.until);
  if(!isNaN(until))
    req.orderUntil = new Date(until);

  next();
};