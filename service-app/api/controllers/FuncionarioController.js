/**
 * FuncionarioController
 *
 * @description :: Server-side logic for managing cadastroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  index: function (req, res) {
    res.view('cadastro/funcionario', {user: req.user[0]});
  },

  /**
   * `FuncionarioController.criar()`
   */
  criar: function (req, res) {
    var nome = req.param('nome');
    var email = req.param('email');
    var senha = req.param('senha');
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

};

