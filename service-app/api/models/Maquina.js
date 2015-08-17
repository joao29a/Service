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
        else return callback(0, "Máquina criada!");
    });
  },

  listar: function(callback) {
    Maquina.query('select * from maquina', function(err, result) {
        if (err) return callback(err, null);
        return callback(null, result);
    });
  },

};

