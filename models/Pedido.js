// Importa o DataTypes do Sequelize para definir os tipos de dados no modelo
const { DataTypes } = require("sequelize");
// Importa a configuração do banco de dados, que conecta o Sequelize ao banco
const sequelize = require("../config/database");
// Importa o modelo de Item, pois vamos criar uma relação entre Pedido e Item
const Item = require("./Item");

// Definindo o modelo Pedido
const Pedido = sequelize.define("Pedido", {
  // Campo para o nome do cliente
  cliente_nome: { 
    type: DataTypes.STRING, // Tipo de dado STRING (texto)
    allowNull: false // Não permite que o nome do cliente seja nulo (não pode ser vazio)
  },
  
  // Campo para a quantidade de produtos
  quantidade: { 
    type: DataTypes.INTEGER, // Tipo de dado INTEGER (número inteiro)
    allowNull: false // Não permite que a quantidade seja nula
  },

  // Campo para o valor total do pedido
  total: { 
    type: DataTypes.FLOAT, // Tipo de dado FLOAT (número com ponto flutuante)
    allowNull: false // Não permite que o total seja nulo
  },

  // Campo para o status do pedido, com valor padrão "pendente"
  status: { 
    type: DataTypes.STRING, // Tipo de dado STRING (texto)
    defaultValue: "pendente" // Valor padrão caso não seja informado (pedido estará pendente)
  },
}, {
  timestamps: false // 🔹 Remove os campos createdAt e updatedAt do modelo (não será necessário)
});

// Relação entre Pedido e Item:
// 1. Cada pedido pertence a um item (pedido está associado a um produto específico)
Pedido.belongsTo(Item, { foreignKey: "produto_id", as: "produto" });
// 2. Um item pode ter muitos pedidos associados a ele (produto pode ter vários pedidos)
Item.hasMany(Pedido, { foreignKey: "produto_id", as: "pedidos" });

// Exporta o modelo Pedido para ser utilizado em outras partes do código
module.exports = Pedido;
