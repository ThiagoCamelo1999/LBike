// Importando o Express para criar as rotas e o roteador
const express = require("express");
const router = express.Router();

// Importando os modelos Item e Pedido do banco de dados
const { Item, Pedido } = require("../models");

// Importando o middleware de autenticação para proteger a rota de pedidos
const autenticar = require("../middleware/auth"); // ✅ Importa o middleware de autenticação

// **Rota para listar todos os produtos disponíveis na loja**
// Quando a rota /produtos for acessada com o método GET, retorna todos os itens do banco
router.get("/produtos", async (req, res) => {
  try {
    // Busca todos os produtos (itens) na tabela "Item"
    const produtos = await Item.findAll();
    // Retorna os produtos encontrados com status 200
    res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    // Em caso de erro, retorna um erro genérico com status 500
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
});

// **Rota para criar um novo pedido**
// Essa rota é protegida pelo middleware de autenticação, que verifica se o usuário está autenticado
router.post("/pedidos", autenticar, async (req, res) => {
  try {
    console.log("💡 Corpo da requisição recebido:", req.body);

    // Desestruturação dos dados enviados no corpo da requisição
    const { cliente_nome, itens } = req.body;
    let pedidosCriados = [];
    let erros = [];

    // Verifica se a lista de itens está vazia ou não foi fornecida
    if (!itens || itens.length === 0) {
      console.log("🚨 Nenhum item encontrado no pedido.");
      return res.status(400).json({ error: "Nenhum item no pedido." });
    }

    // Processa cada item individualmente
    for (const item of itens) {
      console.log(`🔍 Processando item ID ${item.produto_id}...`);

      // Busca o produto no banco pelo ID
      const produto = await Item.findByPk(item.produto_id);

      // Se o produto não for encontrado, registra o erro e passa para o próximo item
      if (!produto) {
        console.log(`🚨 Produto ID ${item.produto_id} não encontrado.`);
        erros.push(`Produto com ID ${item.produto_id} não encontrado.`);
        continue; // Continua para o próximo item, sem encerrar a requisição
      }

      // Calcula o valor total do pedido (quantidade * valor unitário do produto)
      const total = item.quantidade * produto.valor_unitario;

      // Cria um novo pedido no banco com as informações fornecidas
      const pedido = await Pedido.create({
        cliente_nome,           // Nome do cliente
        produto_id: item.produto_id,  // ID do produto
        quantidade: item.quantidade,  // Quantidade do produto
        total,                   // Valor total do pedido
        status: "finalizado",    // Status do pedido (pode ser 'pendente', 'finalizado', etc.)
      });

      // Adiciona o pedido criado à lista de pedidos
      pedidosCriados.push(pedido);
    }

    // Se todos os pedidos foram processados, retorna os pedidos criados
    console.log("🎉 Todos os pedidos foram processados!");
    res.status(200).json({ pedidosCriados, erros }); // Retorna os pedidos criados e os erros encontrados
  } catch (error) {
    console.error("🔥 ERRO NO BACKEND:", error);
    // Caso ocorra algum erro durante o processo, retorna um erro genérico com status 500
    res.status(500).json({ error: "Erro ao processar os pedidos." });
  }
});

// Exportando o roteador para que possa ser usado no servidor principal
module.exports = router;
