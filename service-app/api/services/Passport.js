var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Funcionario.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({usernameField: 'email', 
  passwordField: 'senha'}, function(email, password, done) {
    Funcionario.findOne({ email: email }).exec(function(err, user) {
      if(err) { return done(err); }
      if(!user) { return done(null, false, { message: 'Email ou senha inválido'}); }
      bcrypt.compare(password, user.senha, function(err, res) {
        if(!res) return done(null, false, {message: 'Email ou senha inválido'});
        return done(null, user);
      });
    });
  }
));
