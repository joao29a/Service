

module.exports = {

  attributes: {
    id_cliente: {
      model: "cliente",
      required: true
    },
    situacao: {
      type: "string",
      enum: ['Aberta', 'Finalizada']
    },
    valor: {
      type: "float",
      required: true,
      defaultsTo: 0.0
    },
    pagamento: {
      type: "string",
      enum: ['Dinheiro', 'Cartão de Crédito'],
      defaultsTo: 'Dinheiro'
    }
  },

  criar: function(id_cliente, callback) {
    var pedido = {
      id_cliente: id_cliente,
      situacao: 'Aberta'
    }
    Pedido.create(pedido).exec(function(err, created) {
      if (err) return callback(4, err);
      else return callback(0, created);
    });
  },

  hasAberto: function(id_cliente, callback) {
    var myQuery = Pedido.findOne();
    myQuery.where({id_cliente: id_cliente, situacao: 'Aberta'});
    myQuery.exec(function(err, result) {
      if (err) return callback(err, null);
      return callback(null, result);
    });
  },

  listarPorId: function(id, callback) {
    Pedido.findOne({id: id}).populate('id_cliente').exec(function (err, found) {
      if (err) return callback(1, null);
      return callback(null, found);
    });
  },

  atualizarTotal: function(id, callback) {
    Pedido.findOne({id: id}).exec(function(err, found) {
      if (err || !found) return callback(err, null);
      PedidoItens.listar(found.id, function(err, lista) {
        if (err) return callback(err, null);
        var total = 0;
        for (var i in lista) {
          total += lista[i].quantidade * lista[i].id_produto.valor;
        }
        found.valor = total;
        Pedido.update({id: found.id}, found).exec(function (err, updated) {
          if (err) return callback(err, null);
          return callback(null, updated);
        });
      });
    });
  },

  remover: function(id, callback) {
    Pedido.destroy({id: id}).exec(function(err) {
      if (!err) PedidoItens.removerPedido(id, function(err) {
        if (!err) return callback(null);
      });
    });
  },

  atualizar: function(pedido_item, callback) {
    Pedido.update({id: pedido_item.id}, pedido_item).exec(function (err, updated) {
      if (err) return callback(err, null);
      return callback(null, updated);
    });
  },
}