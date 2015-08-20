/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  index: function(req, res) {
    return res.view('index', {user: Utils.getUser(req.user)});
  },

  login: function(req, res) {
    res.view('login', {layout: '', info: '', email: ''});
  },

  validar: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if (err || !user) {
	return res.view('login', {layout: '', info: info, email: req.param('email')});
      }
      if (user.ativo) {
	req.logIn(user, function(err) {
	  if(err) res.send(err);
	  if (req.param('remember-me')) {
	    var token = Utils.randomString(64);
	    Token.save(token, user.id, function(err) {
	      if (!err) {
		res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
		return res.redirect('/');
	      }
	    });
	  } else return res.redirect('/');
	});
      }
      else return res.view('login', {layout: '', info: {message: 'Usuário desativado!'}, email: req.param('email')});
    })(req, res);
  },

  sair: function(req, res) {
    var token = req.cookies.remember_me
      Token.consume(token, function(err, consumed) {
	if (!err && consumed)
	console.log('Logout token: ' + consumed.token);
      });
    res.clearCookie('remember_me');
    req.logOut();
    res.redirect('/login');
  },
};

