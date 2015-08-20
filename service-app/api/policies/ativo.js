module.exports = function(req, res, next) {

  var user = Utils.getUser(req.user);
  if (user.autoridade != 1) {
    return next();
  }

  return res.view('403', {layout: ''});
};
