/**
 * Maquina.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    fabricante: {
      type: "string",
      required: true
    },
    modelo: {
      type: "string",
      required: true
    },
    dono: {
      model: "cliente"
    },
    video: {
      type: "string",
      required: true
    },
    ram: {
      type: "string",
      required: true
    },
    processador: {
      type: "string",
      required: true
    },
    placamae: {
      type: "string",
      required: true
    },
    ativo: {
      type: "boolean",
      required: true,
      defaultsTo: true
    },
  },

  salvar: function(user, callback) {
    Cliente.findOne().where({or: [{id: user.dono}, {identificador: user.dono}]}).exec(function(err, found) {
      if (err) return callback(1, err);
      if (!found) return callback(3, "Cliente não encontrado!");
      user.dono = found;
      Maquina.create(user).exec(function(err, created) {
        if(err) return callback(1, err);
        else return callback(0, "Máquina cadastrada!");
      });
    });
  },

  listar: function(callback) {
    Maquina.find({ativo: true}, function(err, result) {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  listarFiltro: function(query, callback) {
    if (query.nome == undefined) return this.listar(callback);
    var myQuery = Maquina.find();
    var whereFilter = {}

    if (query.tipo == 'Fabricante') {
      whereFilter.fabricante = {contains: query.nome};
    }

    if (query.tipo == 'Modelo') {
      whereFilter.modelo = {contains: query.nome}; 
    }

    if (query.tipo == 'Dono') {
      whereFilter.dono = {contains: query.nome};
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
    Maquina.findOne({id: id}).exec(function (err, found) {
      if (err) return callback(1, null);
      return callback(null, found);
    });
  },

  listarPorIdPopulate: function(id, callback) {
    Maquina.findOne({id: id}).populate('dono').exec(function (err, found) {
      if (err) return callback(1, null);
      return callback(null, found);
    });
  },

  atualizar: function(user, callback) {
    Cliente.findOne().where({or: [{id: user.dono}, {identificador: user.dono}]}).exec(function(err, found) {
      if (err) return callback(1, null);
      if (!found) return callback({erro: 3, message: "Cliente não encontrado!"}, null);
      user.dono = found;
      Maquina.update({id: user.id}, user).exec(function (err, updated) {
        sails.log(updated);
        if (err) return callback(1, null);
        return callback(null, updated);
      });
    });
  },

};

