// Importando a configuração do banco de dados e os modelos necessários
const sequelize = require("../config/database");
const Item = require("./Item");
const Agendamento = require("./Agendamento");
const Funcionario = require("./Funcionario");
const Pedido =require("./Pedido")


// 🔹 Adiciona as associações novamente para garantir que o Sequelize reconheça
Pedido.belongsTo(Item, { foreignKey: "produto_id", as: "Item" });
Item.hasMany(Pedido, { foreignKey: "produto_id", as: "Pedidos" });

// Sincronizando os modelos com o banco de dados
sequelize
  .sync({ force: false })  // 'force: false' impede a exclusão de tabelas existentes ao reiniciar o banco
  .then(() => {
    console.log("Banco de dados sincronizado.");  // Mensagem de sucesso quando a sincronização é concluída
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:", err);  // Mensagem de erro em caso de falha
  });

// Exportando os modelos para uso em outras partes da aplicação
module.exports = {
  Item,
  Agendamento,
  Funcionario,
  Pedido,
};
