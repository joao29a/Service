/*
 * MaquinaController
 *
 * @description :: Server-side logic for managing Maquinas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    index: function (req, res) {
        var maquina = {
            fabricante: '',
            modelo: '',
            dono: '',
            video: '',
            ram: '',
            processador: '',
            placamae: '',
        };
        res.view('cadastro/maquina', {user: Utils.getUser(req.user), message: '', maquina: maquina, erro: 0});
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

        //Erro na verificação
        sails.log(maquina.fabricante);
        sails.log(maquina.fabricante.lenght);
        if (maquina.fabricante.length == 0)
            return res.view('cadastro/maquina', {user: Utils.getUser(req.user), message: 'Preencha o fabricante!',
                maquina: maquina, erro: 1});
        else if (maquina.modelo.length == 0)
            return res.view('cadastro/maquina', {user: Utils.getUser(req.user), message: 'Preencha o modelo!',
                maquina: maquina, erro: 2});
        else if (maquina.dono.length == 0)
            return res.view('cadastro/maquina', {user: Utils.getUser(req.user), message: 'Preencha o dono!',
                maquina: maquina, erro: 3}); 
        else if (maquina.video.length == 0)
            return res.view('cadastro/maquina', {user: Utils.getUser(req.user), message: 'Preencha o video!',
                maquina: maquina, erro: 4}); 
        else if (maquina.ram.length == 0)
            return res.view('cadastro/maquina', {user: Utils.getUser(req.user), message: 'Preencha o ram!',
                maquina: maquina, erro: 5}); 
        else if (maquina.processador.length == 0)
            return res.view('cadastro/maquina', {user: Utils.getUser(req.user), message: 'Preencha o processador!',
                maquina: maquina, erro: 6});
        else if (maquina.placamae.length == 0)
            return res.view('cadastro/maquina', {user: Utils.getUser(req.user), message: 'Preencha a Placa-mãe!',
                maquina: maquina, erro: 7});

        Maquina.salvar(maquina, function(state, message) {
            if (state == 0) {
                /* verificar essas views */
                return res.view('cadastro/sucesso', {user: Utils.getUser(req.user), message: message});
            } else {
                return res.view('cadastro/maquina', {user: Utils.getUser(req.user), message: message, 
                    maquina: maquina, erro: state});
            }
        });
    },

    listar: function(req, res) {
        var user = Utils.getUser(req.user);
        Maquina.listar(function(err, result) {
            if (err) return res.view('consulta/maquina', {user: user, erro: err, busca: ''});
            return res.view('consulta/maquina', {user: user, erro: '', data: result, busca: ''});
        });
    },

    listarFiltro: function(req, res) {
        var user = Utils.getUser(req.user);
        var query = {
            //Mudar parâmetro de busca
            nome: req.param('busca'),
            tipo: req.param('tipo'),
            ativo: (req.param('ativo') == 'true')
        };
        Maquina.listarFiltro(query, function(err, result) {
            if (err) return res.view('consulta/maquina', {user: user, erro: err});
            return res.view('consulta/maquina', {user: user, erro: '', data: result, busca: query});
        });  
    },

    mostrar: function(req, res) {
        var user = Utils.getUser(req.user);
        var id = req.param('id');
        Maquina.listarPorId(id, function(err, result) {
            if (err || !result) return res.view('404', {layout: ''});
            return res.view('alterar/maquina', {user: user, erro: '', message: '', maquina: result})
        });
    },

    alterar: function (req, res) {
        var user = Utils.getUser(req.user);
        var dadoUsuario = {
            id: req.param('id'),
            fabricante: req.param('fabricante'),
            modelo: req.param('modelo'),
            dono: req.param('dono'),
            video: req.param('video'),
            ram: req.param('ram'),
            processador: req.param('processador'),
            placamae: req.param('placamae')
        };
        Maquina.atualizar(dadoUsuario, function(err, result) {
            if (err || !result) {
                return res.view('alterar/maquina', {user: user, erro: err.erro,
                    message: err.message, maquina: dadoUsuario});
            }
            return res.view('alterar/sucesso', {user: user, message: 'Maquina alterada!'});
        });
    },

    ativar: function(req, res) {
        var user = Utils.getUser(req.user);
        var dadoUsuario = {
            id: req.param('id'),
            ativo: req.param('ativar')
        };
        Maquina.listarPorId(dadoUsuario.id, function(err, found) {
            if (err || !found) return res.json({message: 'Não foi possível alterar o estado do funcionário!'});
            Maquina.atualizar(dadoUsuario, function(err, result) {
                if ( err || !result) return res.json({message: 'Não foi possível alterar  o estado do funcionário! '});
                return res.json({message: 'Estado do funcionário atualizado comsucesso!'});
            });
        });
    },

};

