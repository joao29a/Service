/**
 * FuncionarioController
 *
 * @description :: Server-side logic for managing cadastroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  index: function (req, res) {
    res.view('cadastro/funcionario', {user: Utils.getUser(req.user)});
  },

  /**
   * `FuncionarioController.criar()`
   */
  criar: function (req, res) {
    var funcionario = {
      nome: req.param('nome'),
      email: req.param('email'),
      senha: req.param('senha'),
      autoridade: 0
    }
    Funcionario.salvar(funcionario, function(state, message) {
      if (state == 0) {
        return res.view('cadastro/sucesso', {user: Utils.getUser(req.user), message: message});
      } else {
        return res.view('cadastro/erro', {user: Utils.getUser(req.user), message: message});
      }
    });
  },

  admin: function(req, res) {
    var funcionario = {
      nome: 'admin',
      email: 'admin@service.com',
      senha: 'admin123',
      autoridade: 0
    };
    Funcionario.salvar(funcionario, function(state, message) {
      res.send(message);
    });
  },

  listar: function(req, res) {
    var user = Utils.getUser(req.user);
    Funcionario.listar(function(err, result) {
      if (err) return res.view('consulta/funcionario', {user: user, erro: err});
      return res.view('consulta/funcionario', {user: user, erro: '', data: result});
    });
  },

  listarFiltro: function(req, res) {
    var user = Utils.getUser(req.user);
    return res.view('consulta/funcionario', {user: user, erro: '', data: []});
  },

};

