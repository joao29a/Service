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
      autoridade: 2 //super-administrador
    };
    Funcionario.salvar(funcionario, function(state, message) {
      res.send(message);
    });
  },

  listar: function(req, res) {
    var user = Utils.getUser(req.user);
    Funcionario.listar(function(err, result) {
      if (err) return res.view('consulta/funcionario', {user: user, erro: err, busca: ''});
      return res.view('consulta/funcionario', {user: user, erro: '', data: result, busca: ''});
    });
  },

  listarFiltro: function(req, res) {
    var user = Utils.getUser(req.user);
    var query = {
      nome: req.param('busca'),
      tipo: req.param('tipo'),
      autoridade: req.param('autoridade'),
      ativo: (req.param('ativo') === 'true')
    };
    Funcionario.listarFiltro(query, function(err, result) {
      if (err) return res.view('consulta/funcionario', {user: user, erro: err});
      return res.view('consulta/funcionario', {user: user, erro: '', data: result, busca: query});
    });
  },

  mostrar: function(req, res) {
    var user = Utils.getUser(req.user);
    var id = req.param('id');
    Funcionario.listarPorId(id, function(err, result) {
      if (err || !result) return res.view('404', {layout: ''});
      return res.view('alterar/funcionario', {user: user, erro: '', message: '', funcionario: result});
    });
  },

  alterar: function (req, res) {
    var user = Utils.getUser(req.user);
    var dadoUsuario = {
      id: req.param('id'),
      nome: req.param('nome'),
      email: req.param('email'),
      tipo: req.param('tipo'),
      autoridade: req.param('autoridade')
    };
    Funcionario.atualizar(dadoUsuario, function(err, result) {
      if (err || !result) {
	return res.view('alterar/funcionario', {user: user, erro: err.erro, message: err.message, funcionario: dadoUsuario});
      }
      return res.view('alterar/sucesso', {user: user, message: 'Usuário ' + result[0].nome + ' alterado com sucesso!'});
    });
  },

  ativar: function(req, res) {
    var user = Utils.getUser(req.user);
    var dadoUsuario = {
      id: req.param('id'),
      ativo: req.param('ativar')
    };
    Funcionario.listarPorId(dadoUsuario.id, function(err, found) {
      if (err || !found) return res.json({message: 'Não foi possível alterar o estado do funcionário!'});
      dadoUsuario.email = found.email;
      Funcionario.atualizar(dadoUsuario, function(err, result) {
	if (err || !result) return res.json({message: 'Não foi possível alterar o estado do funcionário!'});
	return res.json({message: 'Estado do funcionário atualizado com sucesso!'});
      });
    });
  },

};

