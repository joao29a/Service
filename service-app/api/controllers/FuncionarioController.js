/**
 * FuncionarioController
 *
 * @description :: Server-side logic for managing cadastroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  index: function (req, res) {
    var funcionario = {
      nome: '',
      email: '',
      senha: '',
      tipo: 'Atendente',
      autoridade: '1',
    };
    res.view('cadastro/funcionario', {user: Utils.getUser(req.user), message: '', funcionario: funcionario, erro: 0});
  },

  /**
   * `FuncionarioController.criar()`
   */
  criar: function (req, res) {
    var funcionario = {
      nome: req.param('nome'),
      email: req.param('email'),
      senha: req.param('senha'),
      tipo: req.param('tipo'),
      autoridade: req.param('autoridade')
    }
    if (funcionario.nome.length == 0)
      return res.view('cadastro/funcionario', {user: Utils.getUser(req.user), message: 'Preencha o nome!',
        funcionario: funcionario, erro: 1});
    else if (funcionario.email.length == 0)
      return res.view('cadastro/funcionario', {user: Utils.getUser(req.user), message: 'Preencha o email!',
        funcionario: funcionario, erro: 2});
    else if (funcionario.senha.length == 0)
        return res.view('cadastro/funcionario', {user: Utils.getUser(req.user), message: 'Preencha a senha!',
          funcionario: funcionario, erro: 5});
    Funcionario.salvar(funcionario, function(state, message) {
      if (state == 0) {
        return res.view('cadastro/sucesso', {user: Utils.getUser(req.user), message: message});
      } else {
        return res.view('cadastro/funcionario', {user: Utils.getUser(req.user), message: message,
          funcionario: funcionario, erro: state});
      }
    });
  },

  admin: function(req, res) {
    var funcionario = {
      nome: 'admin',
      email: 'admin@service.com',
      senha: 'admin123',
      tipo: 'Técnico',
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

