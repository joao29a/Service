

module.exports = {

  attributes: {
    id_cliente: {
      model: "cliente",
      required: true
    },
    id_maquina: {
      model: "maquina",
      required: true
    },
    problema: {
      type: "string",
      required: true
    },
    entrada: {
      type: "datetime",
      required: true
    },
    saida: {
      type: "datetime",
      required: true
    },
    entregue: {
      type: "boolean",
      required: true,
      defaultsTo: false
    },
  },

}