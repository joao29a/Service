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
    tipo: {
      type: "string",
      required: true,
      defaultsTo: "Atendente"
    },
    autoridade: {
      type: "integer",
      required: true,
      defaultsTo: 1
    },
    ativo: {
      type: "boolean",
      required: true,
      defaultsTo: true
    },
  },

  toJSON: function() {
    var obj = this.toObject();
    delete obj.senha;
    return obj;
  },

  salvar: function(user, callback) {
    Funcionario.findOne({email: user.email}).exec(function(err, found) {
      if (err) return callback(4, err);
      if (found) return callback(3, "Email em uso!");
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.senha, salt, function(err, hash) {
          if(err) return callback(4, err);
          user.senha = hash;
          Funcionario.create(user).exec(function(err, created) {
            if (err) return callback(4, err);
            else return callback(0, "Usuário " + created.nome + " criado!");
          });
        });
      });
    });
  },

  listar: function(callback) {
    Funcionario.find({autoridade: {'!': 2}, ativo: true}, function(err, result) {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  listarFiltro: function(query, callback) {
    if (query.nome == undefined) return this.listar(callback);
    var myQuery = Funcionario.find();
    var whereFilter = {};
    whereFilter.autoridade = {'!': 2};
    if (query.tipo != 'Todos') {
      whereFilter.tipo = query.tipo;
    }
    if (query.autoridade != 'Todos') {
      whereFilter.autoridade = query.autoridade;
    }
    whereFilter.ativo = query.ativo;
    myQuery.where(whereFilter)
            .where({or: [{nome: {contains: query.nome}}, {email: {contains: query.nome}}]});
    myQuery.exec(function(err, result) {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  listarPorId: function(id, callback) {
    Funcionario.findOne({id: id}).exec(function (err, found) {
      if (err) return callback(1, null);
      return callback(null, found);
    });
  },

  atualizar: function(user, callback) {
    Funcionario.findOne({email: user.email}).exec(function(err, found){
      if (err) return callback(err, null);
      if (found && found.id != user.id) return callback({erro: 2, message: 'Email já cadastrado!'}, null);
      Funcionario.update({id: user.id}, user).exec(function (err, updated) {
        if (err) return callback(err, null);
        return callback(null, updated);
      });
    });
  },
};
