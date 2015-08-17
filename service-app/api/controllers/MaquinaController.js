/*
 * MaquinaController
 *
 * @description :: Server-side logic for managing Maquinas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    index: function (req, res) {
        res.view('cadastro/maquina', {user: Utils.getUser(req.user)});
    },

    criar: function (req, res) {
        var maquina = {
            fabricante: req.param('fabricante'),
            modelo: req.param('modelo'),
            dono: req.param('dono'),
            video: req.param('video'),
            ram: req.param('ram'),
            processador: req.param('processador'),
            placamae: req.param('placamae'),
        }

        Maquina.salvar(maquina, function(state, message) {
            if (state == 0) {
                /* verificar essas views */
                return res.view('cadastro/sucesso', {user: Utils.getUser(req.user), message: message});
            } else {
                return res.view('cadastro/erro', {user: Utils.getUser(req.user), message: message});
            }
        });
    },

    listar: function(req, res) {
        var user = Utils.getUser(req.user);
        Maquina.listar(function(err, result) {
            if (err) return res.view('consulta/maquina', {user: user, erro: err});
            return res.view('consulta/maquina', {user: user, erro: '', data: result});
        });
    },

    listarFiltro: function(req, res) {
        var user = Utils.getUser(req.user);
        return res.view('consulta/maquina', {user: user, erro: '', data: []});
    },
    
};

