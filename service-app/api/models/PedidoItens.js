
module.exports = {

  attributes: {
    id_pedido: {
      model: "pedido",
      required: true
    },
    id_produto: {
      model: "produto",
      required: true
    },
    quantidade: {
      type: "integer",
      required: true,
      defaultsTo: 1,
    }
  },

  inserir: function(pedido_item, callback) {
    PedidoItens.create(pedido_item).exec(function(err, created) {
      if (err) return callback(4, err);
      else return callback(0, created);
    });
  },

  isInserido: function(pedido_item, callback) {
    var myQuery = PedidoItens.findOne();
    myQuery.where({id_pedido: pedido_item.id_pedido, id_produto: pedido_item.id_produto});
    myQuery.exec(function(err, result) {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  listar: function(id_pedido, callback) {
    PedidoItens.find({id_pedido: id_pedido}).populate('id_produto').populate('id_pedido').exec(function(err, found) {
      if (err) return callback(err, null);
      return callback(null, found);
    });
  },

  remover: function(pedido_item, callback) {
    PedidoItens.destroy({id_pedido: pedido_item.id_pedido, id_produto: pedido_item.id_produto}).exec(function(err) {
      if (!err) return callback(null);
      return callback(err);
    });
  },

  removerPedido: function(id_pedido, callback) {
    PedidoItens.destroy({id_pedido: id_pedido}).exec(function(err) {
      if (!err) return callback(null);
      return callback(err);
    });
  }

};

