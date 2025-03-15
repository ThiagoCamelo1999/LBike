// Importando o Sequelize e a configuração do banco de dados
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definindo o modelo de Agendamento
const Agendamento = sequelize.define("Agendamento", {
  // Nome do cliente
  cliente_nome: {
    type: DataTypes.STRING,
    allowNull: false,  // Não pode ser nulo
  },
  // Telefone do cliente
  cliente_telefone: {
    type: DataTypes.STRING,
    allowNull: false,  // Não pode ser nulo
  },
  // Endereço do cliente
  cliente_endereco: {
    type: DataTypes.STRING,
    allowNull: false,  // Não pode ser nulo
  },
  // Tipo de serviço solicitado
  servico: {
    type: DataTypes.STRING,
    allowNull: false,  // Não pode ser nulo
  },
  // Data e hora do agendamento
  data_hora: {
    type: DataTypes.STRING,  // Ideal usar DataTypes.DATE ou DataTypes.DATEONLY se a data e hora forem relevantes
    allowNull: false,  // Não pode ser nulo
  },
});

// Exportando o modelo para ser utilizado em outras partes da aplicação
module.exports = Agendamento;
