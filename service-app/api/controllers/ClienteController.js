/*
 * ClienteController
 *
 * @description :: Server-side logic for managing clientes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  
  index: function (req, res) {
    var cliente = {
      tipo: '',
      nome: '',
      endereco: '',
      identificador: '',
      telefone: '',
      email: '',
    };
    res.view('cadastro/cliente', {user: Utils.getUser(req.user), message: '', cliente: cliente, erro: 0});
  },

  criar: function (req, res) {
    var cliente = {
      tipo: req.param('tipo'),
      nome: req.param('nome'),
      endereco: req.param('endereco'),
      identificador: req.param('identificador'),
      telefone: req.param('telefone'),
      email: req.param('email')
    }

    if (cliente.nome.length == 0) {
      return res.view('cadastro/cliente', {user: Utils.getUser(req.user), message: 'Preencha o nome!', 
        cliente: cliente, erro: 1});
    } else if (cliente.endereco.length == 0) {
      return res.view('cadastro/cliente', {user: Utils.getUser(req.user), message: 'Preencha o endereço!',
        cliente: cliente, erro: 2});
    } else if (cliente.identificador.length == 0) {
      return res.view('cadastro/cliente', {user: Utils.getUser(req.user), message: 'Preencha o identificador!',
        cliente: cliente, erro: 3});
    } else if (cliente.telefone.length == 0) {
      return res.view('cadastro/cliente', {user: Utils.getUser(req.user), message: 'Preencha o telefone!',
        cliente: cliente, erro: 4}); 
    } 
    //else if (cliente.email.length == 0) {
    //  return res.view('cadastro/cliente', {user: Utils.getUser(req.user), message: 'Preencha o email!',
    //    cliente: cliente, erro: 5});
    //}

    Cliente.salvar(cliente, function(state, message) {
      if (state == 0) {
        return res.view('cadastro/sucesso', {user: Utils.getUser(req.user), message: message});
      } else {
        return res.view('cadastro/cliente', {user: Utils.getUser(req.user), message: message,
          cliente: cliente, erro: state});
      }
    });
  },

  listar: function(req, res) {
    var user = Utils.getUser(req.user);
    Cliente.listar(function(err, result) {
      if (err) return res.view('consulta/cliente', {user: user, erro: err, busca: ''});
      return res.view('consulta/cliente', {user: user, erro: '', data: result, busca: ''});
    });
  },

  listarFiltro: function(req, res) {
    var user = Utils.getUser(req.user);
    var query = {
      nome: req.param('busca'),
      tipo: req.param('tipo'),
      ativo: (req.param('ativo') == 'true')
    };
    Cliente.listarFiltro(query, function(err, result) {
      if (err) return res.view('consulta/cliente', {user: user, erro: err});
      return res.view('consulta/cliente', {user: user, erro: '', data: result, busca: query});
    });
  },

  mostrar: function(req, res) {
    var user = Utils.getUser(req.user);
    var id = req.param('id');
    Cliente.listarPorId(id, function(err, result) {
      if (err || !result) return res.view('404', {layout: ''});
      return res.view('alterar/cliente', {user: user, erro: '', message: '', cliente: result});
    });
  },

  alterar: function (req, res) {
    var user = Utils.getUser(req.user);
    var dadoUsuario = {
      id: req.param('id'),
      nome: req.param('nome'),
      endereco: req.param('endereco'),
      identificador: req.param('identificador'),
      telefone: req.param('telefone'),
      email: req.param('email'),
      ativo: req.param('ativo')
    };
    Cliente.atualizar(dadoUsuario, function(err, result) {
      if (err || !result) {
        return res.view('alterar/cliente', {user: user, erro: err.erro, message: err.message, cliente: dadoUsuario});
      }
      return res.view('alterar/sucesso', {user: user, message: 'Cliente ' + result[0].nome + ' alterado com sucesso!'});
    });
  },

  ativar: function(req, res) {
    var user = Utils.getUser(req.user);
    var dadoUsuario = {
      id: req.param('id'),
      ativo: req.param('ativar')
    };
    Cliente.listarPorId(dadoUsuario.id, function(err, found) {
      if (err || !found) return res.json({message: 'Não foi possível alterar o estado do Cliente!'});
      Cliente.atualizar(dadoUsuario, function(err, result) {
        if (err || !result) return res.json({message: 'Não foi possível alterar o estado do Cliente!'});
        return res.json({message: 'Estado do cliente atualizado com sucesso!'});
      });
    })
  },

};

