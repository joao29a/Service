var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    RememberMeStrategy = require('passport-remember-me').Strategy,
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

passport.use(new RememberMeStrategy(
  function(token, done) {
    Token.consume(token, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      Funcionario.findOne({id: user.id_usuario}).exec(function(err, found) {
        if (err) return done(err);
        if (!found) return done(null, false, {message: 'Usuario não encontrado'}); 
        return done(null, found);
      });
    });
  },
  function(user, done) {
    var token = Utils.randomString(64);
    Token.save(token, user.id, function(err) {
      if (err) { return done(err); }
      return done(null, token);
    });
  }
));
