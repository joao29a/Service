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
        type: "string",
        required: true
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
  },

  salvar: function(user, callback) {
    Maquina.create(user).exec(function(err, created) {
        if(err) return callback(1, err);
        else return callback(0, "Máquina cadastrada!");
    });
  },

  listar: function(callback) {
    Maquina.find(function(err, result) {
        if (err) return callback(err, null);
        return callback(null, result);
    });
  },

  listarFiltro: function(query, callback) {
    if (query.nome == undefined) return this.listar(callback);
    var myQuery = Maquina.find();
    var whereFilter = {}

    if (query.nome.lenght > 0) {
        whereFilter.fabricante = {contains: query.nome};
        whereFilter.modelo = {contains: query.nome};
        whereFilter.dono = {contains: query.nome};
    }

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

  atualizar: function(user, callback) {
    Maquina.update({id: user.id}, user).exec(function (err, updated) {
        if (err) return callback(1, null);
        return callback(null, updated);
    })
  },

};

