/**
* Cliente.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    tipo: {
        type: "string",
        enum: ['Empresa', 'Pessoa física'],
          required: true
    },
    nome: {
        type: "string",
        required: true
    },
    endereco: {
        type: "string",
        required: true
    },
    identificador: {
        type: "string",
        unique: true,
        required: true
    },
    telefone: {
        type: "string",
        unique: true,
        required: true
    },
    email: {
        type: "email",
        unique: true
    },
    ativo: {
        type: "boolean",
        required: true,
        defaultsTo: true
    },
  },

  salvar: function(user, callback) {
    if (user.tipo == 'Pessoa física') {
      Cliente.findOne({identificador: user.identificador}).exec(function(err, found) {
        if (err) return callback(4, err);
        if (found) return callback(3, "CPF já existente no sistema!");
        Cliente.create(user).exec(function(err, created) {
          if (err) return callback(4, err);
          else return callback(0, "Cliente " + created.nome + " criado!");
        });
      });
    } else {
      Cliente.findOne({identificador: user.identificador}).exec(function(err, found) {
        if (err) return callback(4, err);
        if (found) return callback(3, "CNPJ já existente no sistema!");
        Cliente.create(user).exec(function(err, created) {
          if (err) return callback(4, err);
          else return callback(0, "Cliente " + created.nome + " criado!");
        });
      });
    }
  },

  listar: function(callback) {
    Cliente.find({ativo: true}, function(err, result) {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  listarFiltro: function(query, callback) {
    if (query.nome == undefined) return this.listar(callback);
    var myQuery = Cliente.find();
    var whereFilter = {};
    
    if (query.tipo == 'Nome') {
      whereFilter.nome = {contains: query.nome};
    }

    if (query.tipo == 'CPF') {
      whereFilter.identificador = {contains: query.nome};
      whereFilter.tipo = {contains: 'Pessoa física'};
    }

    if (query.tipo == 'CNPJ') {
      whereFilter.identificador = {contains: query.nome};
      whereFilter.tipo = {contains: 'Empresa'};
    }

    whereFilter.ativo = query.ativo;
    if (Object.keys(whereFilter).lenght != 0) {
      myQuery.where({or: [whereFilter]});
    }
    myQuery.exec(function(err, result) {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  listarPorId: function(id, callback) {
    Cliente.findOne({id: id}).exec(function (err, found) {
      if (err) return callback(1, null);
      return callback(null, found);
    });
  },

  atualizar: function(user, callback) {
    if (user.tipo == 'Pessoa física') {
      Cliente.findOne({identificador: user.identificador}).exec(function(err, found) {
        if (err) return callback(4, err);
        if (found && found.id != user.id) return callback({erro:2, message: 'CPF já cadastrado!'}, null);
        Cliente.update({id: user.id}, user).exec(function (err, updated) {
          if (err) return callback(1, null);
          return callback(null, updated);
        });
      });
    } else {
      Cliente.findOne({identificador: user.identificador}).exec(function(err, found) {
        if (err) return callback(4, err);
        if (found && found.id != user.id) return callback({erro:2, message: 'CNPJ já cadastrado!'}, null);
        Cliente.update({id: user.id}, user).exec(function (err, updated) {
          if (err) return callback(1, null);
          return callback(null, updated);
        });
      }); 
    }
  },

};

