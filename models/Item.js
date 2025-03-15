// Importando o Sequelize e a configuração do banco de dados
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definindo o modelo de Item
const Item = sequelize.define("Item", {
  // Nome do item
  nome: {
    type: DataTypes.STRING,
    allowNull: false,  // Não pode ser nulo
  },
  // Tipo de item (por exemplo, bicicleta, acessório, etc.)
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,  // Não pode ser nulo
  },
  // Marca do item
  marca: {
    type: DataTypes.STRING,
    allowNull: false,  // Não pode ser nulo
  },
  // Quantidade disponível em estoque
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Não pode ser nulo
  },
  // Valor unitário do item
  valor_unitario: {
    type: DataTypes.FLOAT,
    allowNull: false,  // Não pode ser nulo
  },
  // Valor total do item (quantidade * valor unitário)
  valor_total: {
    type: DataTypes.FLOAT,
    allowNull: false,  // Não pode ser nulo
  },
  imagem_url: { // Campo para armazenar a URL da imagem
    type: DataTypes.STRING,
    allowNull: true,
  }
});

// Exportando o modelo para ser utilizado em outras partes da aplicação
module.exports = Item;
