var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = {
  http: {
    customMiddleware: function(app) {
      console.log('Express middleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(passport.authenticate('remember-me'));
    }
  }
};
