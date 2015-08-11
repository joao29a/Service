/**
 * FuncionarioController
 *
 * @description :: Server-side logic for managing cadastroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `FuncionarioController.criar()`
   */
  criar: function (req, res) {
    var nome = req.param('nome');
    var email = req.param('email');
    var senha = req.param('senha');
    Funcionario.create({nome: nome}).exec(function createCB(err, created){
        console.log('Created user with name ' + created.nome);
        return res.view('cadastro/sucesso', {
          dados: {
            nome: nome,
            email: email,
          }
        });
    });
  },

};

