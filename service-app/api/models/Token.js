module.exports = {
  attributes: {
    token: {
      type: "string",
      required: true
    },
    id_usuario: {
      type: "integer",
      required: true,
    },
  },

  consume: function(token, callback) {
    Token.findOne({token: token}).exec(function(err, found) {
      if (err || !found) return callback(err, null);
      Token.destroy({token: found.token}).exec(function(err) {
        if (!err) return callback(null, found);
      });
    });
  },

  save: function(token, id, callback) {
    Token.findOne({token: token}).exec(function(err, found) {
      if (err) return callback(err);
      if (found) {
        Token.update({token: found}, {id_usuario: id}).exec(function(err, updated) {
          if (err) return callback(err);
          return callback(null);
        });
      } else {
        Token.create({token: token, id_usuario: id}).exec(function(err, created) {
          if (err) return callback(err);
          return callback(null);
        });
      }
    });
  }
};
