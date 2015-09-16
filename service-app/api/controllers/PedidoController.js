
module.exports = {

  listarProdutos: function(req, res) {
    var user = Utils.getUser(req.user);
    var id_cliente = req.param('id');
    var adicionar = req.param('adicionar');
    Pedido.hasAberto(id_cliente, function(err, aberto) {
      if (!aberto) {
        Pedido.criar(id_cliente, function(err, created) {
          Produto.listar(function(err, result) {
            if (err) return res.view('venda/pedido', {user: user, erro: err, busca: '', pedido: created});
            return res.view('venda/pedido', {user: user, erro: '', data: result, busca: '', pedido: created});
          });
        });
      } else if (aberto && !adicionar) {
        res.redirect('/consulta/pedido/' + aberto.id);
      } else if (aberto && adicionar) {
        Produto.listar(function(err, result) {
          if (err) return res.view('venda/pedido', {user: user, erro: err, busca: '', pedido: aberto});
          return res.view('venda/pedido', {user: user, erro: '', data: result, busca: '', pedido: aberto});
        });
      }
    });
  },

  listarProdutosFiltro: function(req, res) {
    var user = Utils.getUser(req.user);
    var query = {
      nome: req.param('busca'),
      ativo: true
    };
    var id_cliente = req.param('id');
    Pedido.hasAberto(id_cliente, function(err, aberto) {
      Produto.listarFiltro(query, function(err, result) {
        if (err) return res.view('venda/pedido', {user: user, erro: err, pedido: aberto});
        return res.view('venda/pedido', {user: user, erro: '', data: result, busca: query, pedido: aberto});
      });
    });
  },

  adicionarProduto: function(req, res) {
    var user = Utils.getUser(req.user);
    var pedido_item = {
      id_produto: req.param('id_produto'),
      id_pedido: req.param('id')
    };
    PedidoItens.isInserido(pedido_item, function(err, inserido) {
      if (!inserido) {
        PedidoItens.inserir(pedido_item, function(err, inserted) {
          if (err && !inserted) return res.json({sucesso: false, erro: err});
          Pedido.atualizarTotal(inserted.id_pedido, function(err, atualizado) {
            if (err) return res.json({sucesso: false, erro: err});
            return res.json({sucesso: true, isInserido: false});
          });
        });
      } else {
        res.json({sucesso: true, isInserido: true})
      }
    });
  },

  mostrarPedido: function(req, res) {
    var user = Utils.getUser(req.user);
    var id = req.param('id');
    Pedido.listarPorId(id, function(err, result) {
      if (err || !result) return res.view('404', {layout: ''});
      var pedido = result;
      PedidoItens.listar(pedido.id, function(err, itens) {
        if (err || !itens) return res.view('404', {layout: ''});
        pedido.itens = itens;
        return res.view('alterar/pedido', {user: user, erro: '', message: '', pedido: pedido});
      });
    });
  },

  removerProduto: function(req, res) {
    var user = Utils.getUser(req.user);
    var pedido_item = {
      id_produto: req.param('id_produto'),
      id_pedido: req.param('id')
    };
    PedidoItens.remover(pedido_item, function(err) {
      if (!err) {
        Pedido.atualizarTotal(pedido_item.id_pedido, function(err, atualizado) {
          if (err) return res.json({sucesso: false, erro: err});
          res.json({sucesso: true});
        });
      }
    });
  },

  cancelarPedido: function(req, res) {
    var user = Utils.getUser(req.user);
    var id_pedido = req.param('id');
    Pedido.remover(id_pedido, function(err) {
      if (!err) res.json({sucesso: true});
    });
  },

  finalizar: function(req, res) {
    var user = Utils.getUser(req.user);
    var id = req.param('id');
    var pagamento = req.param('pagamento');
    Pedido.listarPorId(id, function(err, found) {
      if (err) return res.json({sucesso: false, erro: err});
      found.id_cliente = found.id_cliente.id;
      found.pagamento = pagamento;
      found.situacao = 'Finalizada';
      Pedido.atualizar(found, function(err, updated) {
        if (err) return res.json({sucesso: false, erro: err});
        PedidoItens.listar(id, function(err, itens) {
          if (err) return res.json({sucesso: false, erro: err});
          for (var i in itens) {
            itens[i].id_produto.quantidade -= itens[i].quantidade;
            Produto.atualizar(itens[i].id_produto, function(err, updated) {});
          }
          return res.json({sucesso: true});
        });
      });
    });
  }
};
