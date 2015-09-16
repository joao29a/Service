
module.exports = {

  gerar: function (req, res) {
    var user = Utils.getUser(req.user);
    var id_maquina = req.param('id');
    Servico.emAberto(id_maquina, function(err, servico) {
      if (!servico) {
        Maquina.listarPorIdPopulate(id_maquina, function(err, found) {
          if (err) return res.view('cadastro/servico', {user: user, erro: err, maquina: found});
          return res.view('cadastro/servico', {user: user, erro: '', maquina: found, saida: Utils.getDate(), 
            entrada: Utils.getDate()});
        });
      } else {
        return res.view('alterar/servico', {user: user, erro: '', servico: servico});
      }
    });
  },

  criar: function (req, res) {
    var user = Utils.getUser(req.user);
    var servico = {
      id_cliente: req.param('clienteId'),
      id_maquina: req.param('maquinaId'),
      problema: req.param('problema'),
      entrada: req.param('entrada'),
      saida: req.param('saida')
    };
    var valor = req.param('valor'); 
    if (valor) servico.valor = valor;
    Servico.criar(servico, function(err, created) {
      if (err) return res.view('cadastro/servico/' + servico.id_maquina, {user: Utils.getUser(req.user), 
        erro: err, servico: servico});
      return res.view('cadastro/sucesso', {user: Utils.getUser(req.user), 
        message: 'Ordem Nº ' + created.id + ' criada!', tipoCadastro: 'Ordem de Serviço'});
    });
  },

  alterar: function(req, res) {
    var user = Utils.getUser(req.user);
    var servico = {
      id: req.param('id'),
      id_cliente: req.param('clienteId'),
      id_maquina: req.param('maquinaId'),
      problema: req.param('problema'),
      entrada: req.param('entrada'),
      saida: req.param('saida'),
      valor: req.param('valor'),
      entregue: true
    };
    Servico.atualizar(servico, function(err, updated) {
      return res.view('alterar/sucesso', {user: user, tipoAlterar: 'Ordem de Serviço', 
        message: 'Ordem de serviço Nº ' + servico.id + ' finalizada!'});
    });
  },
}