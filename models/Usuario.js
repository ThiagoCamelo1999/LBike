// Importa o DataTypes do Sequelize para definir os tipos de dados dos campos
const { DataTypes } = require("sequelize");
// Importa a configuração do banco de dados, que conecta o Sequelize ao banco
const sequelize = require("../config/database");

// Define o modelo Usuario, que representará a tabela de usuários no banco
const Usuario = sequelize.define("Usuario", {
  // Campo para o nome do usuário
  nome: {
    type: DataTypes.STRING, // Tipo de dado STRING (texto)
    allowNull: false, // Não permite que o nome seja nulo (não pode ser vazio)
  },

  // Campo para o CPF do usuário
  cpf: {
    type: DataTypes.STRING, // Tipo de dado STRING (texto)
    allowNull: false, // Não permite que o CPF seja nulo
    unique: true, // Garante que o CPF seja único (não pode ser repetido)
  },

  // Campo para o telefone do usuário
  telefone: {
    type: DataTypes.STRING, // Tipo de dado STRING (texto)
    allowNull: false, // Não permite que o telefone seja nulo
  },

  // Campo para o endereço do usuário
  endereco: {
    type: DataTypes.STRING, // Tipo de dado STRING (texto)
    allowNull: false, // Não permite que o endereço seja nulo
  },

  // Campo para o email do usuário
  email: {
    type: DataTypes.STRING, // Tipo de dado STRING (texto)
    allowNull: false, // Não permite que o email seja nulo
    unique: true, // Garante que o email seja único (não pode ser repetido)
  },

  // Campo para a senha do usuário
  senha: {
    type: DataTypes.STRING, // Tipo de dado STRING (texto)
    allowNull: false, // Não permite que a senha seja nula
  },

  // Campo para o tipo de usuário (pode ser "dono" ou "cliente")
  tipo_usuario: {
    type: DataTypes.ENUM("dono", "cliente"), // Tipo de dado ENUM (somente esses dois valores)
    allowNull: false, // Não permite que o tipo de usuário seja nulo
  },
});

// Exporta o modelo Usuario para ser utilizado em outras partes do código
module.exports = Usuario;
