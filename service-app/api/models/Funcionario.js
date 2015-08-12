var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    nome: {
      type: "string",
      required: true
    },
    email: {
      type: "string",
      required: true,
      unique: true
    },
    senha: {
      type: "string",
      required: true,
    },
    autoridade: {
      type: "integer",
      required: true,
      defaultsTo: 0
    },
  },

  toJSON: function() {
    var obj = this.toObject();
    delete obj.senha;
    return obj;
  },

  salvar: function(user, callback) {
    Funcionario.findOne({email: user.email}).exec(function(err, found) {
      if (err) return callback(1, err);
      if (found) return callback(1, "Email em uso!");
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.senha, salt, function(err, hash) {
          if(err) return callback(1, err);
          user.senha = hash;
          Funcionario.create(user).exec(function(err, created) {
            if (err) return callback(1, err);
            else return callback(0, "Usuário " + created.nome + " criado!");
          });
        });
      });
    });
  },
};
