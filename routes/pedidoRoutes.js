// Importando o Express e o roteador
const express = require("express");
const router = express.Router();

// Importando os modelos Pedido e Item
const { Pedido, Item } = require("../models");

// Rota para listar todos os pedidos (apenas usuários autenticados podem acessar)
router.get("/", async (req, res) => {
  try {
    // Buscando todos os pedidos e incluindo as informações do produto relacionado
    const pedidos = await Pedido.findAll({
      include: [
        {
          model: Item, // Inclui a tabela de Itens (produto) na consulta
          as: "produto", // Alias para o relacionamento (especificado no modelo Pedido)
          attributes: ["nome", "marca", "valor_unitario"], // Retorna apenas esses atributos do produto
        },
      ],
    });

    // Retorna os pedidos com status 200 se a busca for bem-sucedida
    res.status(200).json(pedidos);
  } catch (error) {
    // Em caso de erro, loga o erro e retorna uma resposta de erro com status 500
    console.error("Erro ao buscar pedidos:", error);
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
});

// Exportando o roteador para uso no servidor principal
module.exports = router;
