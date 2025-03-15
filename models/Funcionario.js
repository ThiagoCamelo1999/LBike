// Importando o Sequelize e a configuração do banco de dados
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definindo o modelo de Funcionario
const Funcionario = sequelize.define("Funcionario", {
  // Nome do funcionário
  nome: {
    type: DataTypes.STRING,
    allowNull: false,  // Não pode ser nulo
  },
  // CPF do funcionário
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,  // Não pode ser nulo
    // Você pode adicionar uma validação customizada de CPF aqui, caso necessário
  },
  // Telefone do funcionário
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,  // Não pode ser nulo
  },
  // Endereço do funcionário
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,  // Não pode ser nulo
  },
  // Dias trabalhados pelo funcionário no mês ou período
  dias_trabalhados: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Não pode ser nulo
  },
  // Valor pago ao funcionário
  valor_pago: {
    type: DataTypes.FLOAT,
    allowNull: false,  // Não pode ser nulo
  },
});

// Exportando o modelo para ser utilizado em outras partes da aplicação
module.exports = Funcionario;
