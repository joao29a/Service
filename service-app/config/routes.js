/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'get /': 'AuthController.index',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
 
  //criar usuario admin
  'get /cadastro/funcionario/admin': 'FuncionarioController.admin',

  'get /cadastro/funcionario': 'FuncionarioController.index',

  // Maquina
  'get /cadastro/maquina': 'MaquinaController.index',
  'get /cadastro/maquina/:id': 'MaquinaController.index',
  //

  // Cliente
  'get /cadastro/cliente': 'ClienteController.index',
  //

  'post /cadastro/funcionario/criar': 'FuncionarioController.criar',

  // Maquina
  'post /cadastro/maquina/criar': 'MaquinaController.criar',
  //

  // Cliente
  'post /cadastro/cliente/criar': 'ClienteController.criar',
  //

  'get /login': 'AuthController.login',

  'post /login': 'AuthController.validar',
  
  'get /logout': 'AuthController.sair',
  
  'get /consulta/funcionario': 'FuncionarioController.listar',

  // Maquina
  'get /consulta/maquina': 'MaquinaController.listar',
  //

  // Cliente
  'get /consulta/cliente': 'ClienteController.listar',
  //

  'post /consulta/funcionario': 'FuncionarioController.listarFiltro',
  
  // Maquina
  'post /consulta/maquina': 'MaquinaController.listarFiltro',
  //

  // Cliente
  'post /consulta/cliente': 'ClienteController.listarFiltro',
  //

  '/consulta/funcionario/:id': 'FuncionarioController.mostrar',
  
  '/alterar/funcionario/:id': 'FuncionarioController.alterar',
  
  '/alterar/funcionario/:id/:ativar': 'FuncionarioController.ativar',

  // Maquina
  '/consulta/maquina/:id': 'MaquinaController.mostrar',

  '/alterar/maquina/:id': 'MaquinaController.alterar',

  '/alterar/maquina/:id/:ativar': 'MaquinaController.ativar',
  //

  // Cliente
  '/consulta/cliente/:id': 'ClienteController.mostrar',

  '/alterar/cliente/:id': 'ClienteController.alterar',

  '/alterar/cliente/:id/:ativar': 'ClienteController.ativar',
  //

  // Produto

  'get /cadastro/produto': 'ProdutoController.index',

  'post /cadastro/produto/criar': 'ProdutoController.criar',

  'get /consulta/produto': 'ProdutoController.listar',

  'post /consulta/produto': 'ProdutoController.listarFiltro',

  '/consulta/produto/:id': 'ProdutoController.mostrar',
  
  '/alterar/produto/:id': 'ProdutoController.alterar',
  
  '/alterar/produto/:id/:ativar': 'ProdutoController.ativar',

  //teste Relatorio
  '/relatorios/estoque/:id' : 'ProdutoController.mostrarData',

  'get /relatorios/estoque' : 'ProdutoController.listarTData',

  'post /relatorios/estoque' : 'ProdutoController.listarData',

  // Realizar Venda - Pedido

  'get /venda/pedido/:id' : 'PedidoController.listarProdutos',

  'post /venda/pedido/:id' : 'PedidoController.listarProdutosFiltro',

  '/venda/pedido/:id/adicionar/:id_produto' : 'PedidoController.adicionarProduto',

  'get /consulta/pedido/:id' : 'PedidoController.mostrarPedido',

  '/venda/pedido/:id/remover/:id_produto' : 'PedidoController.removerProduto',

  '/venda/pedido/:id/cancelar' : 'PedidoController.cancelarPedido',
};
