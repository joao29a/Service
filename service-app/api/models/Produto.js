/**
* Produto.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    nome: {
      type: "string",
      unique: true,
      required: true
    },
    marca: {
      type: "string",
      required: true
    },
    modelo: {
      type: "string",
      required: true
    },
    valor: {
      type: "string",
      required: true
    },
    quantidade: {
      type: "integer",
      defaultsTo: 0
    },
    ativo: {
      type: "boolean",
      defaultsTo: true
    },
  },

  salvar: function(produto, callback) {
    Produto.findOne({nome: produto.nome}).exec(function(err, found) {
      if (err) return callback(4, err);
      if (found) return callback(3, "Produto já existente no sistema!");
      produto.valor = parseFloat(produto.valor).toFixed(2);
      Produto.create(produto).exec(function(err, created) {
        if (err) return callback(4, err);
        else return callback(0, "Produto " + created.nome + " criado!");
      });
    });
  },

  listar: function(callback) {
    Produto.find({ativo: true}, function(err, result) {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  listarFiltro: function(query, callback) {
    if (query.nome == undefined) return this.listar(callback);
    var myQuery = Produto.find();
    var whereFilter = {};
    whereFilter.ativo = query.ativo;
    myQuery.where(whereFilter)
    .where({or: [{nome: {contains: query.nome}}, {marca: {contains: query.nome}},
      {modelo: {contains: query.nome}}]});
    myQuery.exec(function(err, result) {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  listarPorId: function(id, callback) {
    Produto.findOne({id: id}).exec(function (err, found) {
      if (err) return callback(1, null);
      return callback(null, found);
    });
  },

  atualizar: function(produto, callback) {
    Produto.findOne({nome: produto.nome}).exec(function(err, found){
      if (err) return callback(err, null);
      if (found && found.id != produto.id) return callback({erro: 2, message: 'Produto já cadastrado!'}, null);
      produto.valor = parseFloat(produto.valor).toFixed(2);
      Produto.update({id: produto.id}, produto).exec(function (err, updated) {
        if (err) return callback(err, null);
        return callback(null, updated);
      });
    });
  },

  //teste
  listarData: function(query, callback) {
    Produto.find({ createdAt: { '>=': new Date(query.ano.concat(query.from)), '<': new Date(query.ano.concat(query.to)) } }, function (err, result) {
      if (err) return callback(err, null);
      sails.log(result);
      return callback(null, result);
    });
  },

};
