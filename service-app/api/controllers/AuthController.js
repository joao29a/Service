/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  index: function(req, res) {
    return res.view('index', {user: req.user[0]});
  },

  login: function(req, res) {
    res.view('login', {layout: '', info: ''});
  },

  validar: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if (err || !user) {
        return res.view('login', {layout: '', info: info});
      }
      req.logIn(user, function(err) {
        if(err) res.send(err);
        return res.redirect('/');
      });
    })(req, res);
  },

  sair: function(req, res) {
    req.logOut();
    res.redirect('/login');
  },
};

