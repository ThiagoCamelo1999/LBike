// Importando o Express, CORS e o Sequelize
const express = require("express"); // Importa o Express para criar a aplicação web
const cors = require("cors"); // Importa o middleware CORS para permitir requisições de diferentes origens
const sequelize = require("./config/database"); // Importa a configuração do Sequelize, responsável pela conexão com o banco de dados
require("./config/setupAdmin"); // Importa a configuração do administrador (provavelmente cria um usuário inicial)

// Inicializando o Express
const app = express(); // Cria a instância da aplicação Express

// Usando o CORS para permitir requisições de diferentes origens
app.use(cors()); // Aplica o middleware CORS para permitir acesso à API de diferentes origens

// Usando o middleware para processar o corpo das requisições no formato JSON
app.use(express.json()); // Middleware que converte o corpo das requisições JSON em um objeto JavaScript

// Middleware para permitir o processamento de dados URL-encoded (dados do formulário)
app.use(express.urlencoded({ extended: true })); // Middleware para processar dados URL-encoded (ex.: formulários HTML)

// Rotas
// Rota para itens
const itemRoutes = require("./routes/itemRoutes"); // Importa as rotas de itens
app.use("/api/items", itemRoutes); // Aplica as rotas de itens na URL "/api/items"

// Rota para a loja
const lojaRoutes = require("./routes/lojaRoutes"); // Importa as rotas da loja
app.use("/api/loja", lojaRoutes); // Aplica as rotas da loja na URL "/api/loja"

// Rota para autenticação
const authRoutes = require("./routes/authRoutes"); // Importa as rotas de autenticação
app.use("/api/auth", authRoutes); // Aplica as rotas de autenticação na URL "/api/auth"

// Rota para pedidos
const pedidoRoutes = require("./routes/pedidoRoutes"); // Importa as rotas de pedidos
app.use("/api/pedidos", pedidoRoutes); // Aplica as rotas de pedidos na URL "/api/pedidos"

// Rota para agendamentos
const agendamentoRoutes = require("./routes/agendamentoRoutes"); // Importa as rotas de agendamento
app.use("/api/agendamentos", agendamentoRoutes); // Aplica as rotas de agendamentos na URL "/api/agendamentos"

// Rota para funcionários
const funcionarioRoutes = require("./routes/funcionarioRoutes"); // Importa as rotas de funcionários
app.use("/api/funcionarios", funcionarioRoutes); // Aplica as rotas de funcionários na URL "/api/funcionarios"

// Inicialização do servidor
const PORT = process.env.PORT || 3000; // Define a porta do servidor, com fallback para 3000
app.listen(PORT, async () => { // Inicia o servidor na porta definida
  try {
    // Tentando autenticar a conexão com o banco de dados
    await sequelize.authenticate(); // Tenta autenticar a conexão com o banco de dados
    console.log("Conectado ao banco de dados."); // Exibe mensagem de sucesso
  } catch (error) {
    // Caso haja erro na autenticação do banco de dados
    console.error("Erro de conexão:", error); // Exibe mensagem de erro
  }
  
  // Mensagem indicando que o servidor foi inicializado corretamente
  console.log(`Servidor rodando na porta ${PORT}`); // Exibe mensagem de que o servidor está rodando
});
