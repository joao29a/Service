

module.exports = {

  attributes: {
    id_cliente: {
      model: "cliente",
      required: true
    },
    id_maquina: {
      model: "maquina",
      required: true
    },
    problema: {
      type: "string",
      required: true
    },
    entrada: {
      type: "string",
      required: true
    },
    saida: {
      type: "string",
      required: true
    },
    entregue: {
      type: "boolean",
      required: true,
      defaultsTo: false
    },
    valor: {
      type: "float",
      required: true,
      defaultsTo: 0.0
    }
  },

  criar: function(servico, callback) {
    Servico.create(servico).exec(function(err, created) {
      if (err) return callback(4, err);
      else return callback(0, created);
    });
  },

  emAberto: function(id, callback) {
    Servico.findOne({id_maquina: id, entregue: false}).exec(function (err, found) {
      if (err) return callback(1, null);
      if (found) found.situacao = 'Em andamento';
      return callback(null, found);
    });
  },

  atualizar: function(servico, callback) {
    Servico.update({id: servico.id}, servico).exec(function (err, updated) {
      if (err) return callback(err, null);
      return callback(null, updated);
    });
  },

}