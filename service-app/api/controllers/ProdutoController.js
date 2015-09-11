/**
 * ProdutoController
 *
 * @description :: Server-side logic for managing cadastroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

  index: function (req, res) {
    var produto = {
      nome: '',
      marca: '',
      modelo: '',
      valor: '',
      quantidade: '',
    };
    res.view('cadastro/produto', {user: Utils.getUser(req.user), message: '', produto: produto, erro: 0});
  },

  criar: function (req, res) {
    var produto = {
      nome: req.param('nome'),
      marca: req.param('marca'),
      modelo: req.param('modelo'),
      valor: req.param('valor'),
      quantidade: req.param('quantidade')
    }
    Produto.salvar(produto, function(state, message) {
      if (state == 0) {
        return res.view('cadastro/sucesso', {user: Utils.getUser(req.user), message: message, tipoCadastro: 'Produto'});
      } else {
        return res.view('cadastro/produto', {user: Utils.getUser(req.user), message: message,
          produto: produto, erro: state});
      }
    });
  },

  listar: function(req, res) {
    var user = Utils.getUser(req.user);
    Produto.listar(function(err, result) {
      if (err) return res.view('consulta/produto', {user: user, erro: err, busca: ''});
      return res.view('consulta/produto', {user: user, erro: '', data: result, busca: ''});
    });
  },

  listarFiltro: function(req, res) {
    var user = Utils.getUser(req.user);
    var query = {
      nome: req.param('busca'),
      ativo: (req.param('ativo') === 'true')
    };
    Produto.listarFiltro(query, function(err, result) {
      if (err) return res.view('consulta/produto', {user: user, erro: err});
      return res.view('consulta/produto', {user: user, erro: '', data: result, busca: query});
    });
  },

  mostrar: function(req, res) {
    var user = Utils.getUser(req.user);
    var id = req.param('id');
    Produto.listarPorId(id, function(err, result) {
      if (err || !result) return res.view('404', {layout: ''});
      return res.view('alterar/produto', {user: user, erro: '', message: '', produto: result});
    });
  },

  alterar: function (req, res) {
    var user = Utils.getUser(req.user);
    var dadoProduto = {
      id: req.param('id'),
      nome: req.param('nome'),
      marca: req.param('marca'),
      modelo: req.param('modelo'),
      valor: req.param('valor'),
      quantidade: req.param('quantidade'),
    };
    Produto.atualizar(dadoProduto, function(err, result) {
      if (err || !result) {
        return res.view('alterar/produto', {user: user, erro: err.erro, message: err.message, produto: dadoProduto});
      }
      return res.view('alterar/sucesso', {user: user, tipoAlterar: 'Produto', message: 'Produto ' + result[0].nome + ' alterado com sucesso!'});
    });
  },

  ativar: function(req, res) {
    var user = Utils.getUser(req.user);
    var dadoProduto = {
      id: req.param('id'),
      ativo: req.param('ativar')
    };
    Produto.listarPorId(dadoProduto.id, function(err, found) {
      if (err || !found) return res.json({message: 'Não foi possível alterar o estado do produto!'});
      dadoProduto.nome = found.nome;
      Produto.atualizar(dadoProduto, function(err, result) {
        if (err || !result) return res.json({message: 'Não foi possível alterar o estado do produto!'});
        return res.json({message: 'Estado do produto atualizado com sucesso!'});
      });
    });
  },

};