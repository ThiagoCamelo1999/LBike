// Importando o Express para trabalhar com rotas e o roteador para organizar as rotas
const express = require("express");
const router = express.Router();

// Importando o controller de itens e o modelo de Item do banco de dados
const itemController = require("../controllers/itemController");
const { Item } = require("../models"); // Certificando-se de usar o modelo "Item"

// **Rotas para o gerenciamento de itens**:

// Rota para obter todos os itens
// Quando a rota / for acessada com o método GET, a função getAllItems do itemController será chamada
router.get("/", itemController.getAllItems);

// Rota para criar um novo item
// Quando a rota / for acessada com o método POST, cria um novo item com os dados fornecidos no corpo da requisição
router.post("/", async (req, res) => {
  try {
    // Obtendo os dados enviados no corpo da requisição
    const { nome, tipo, marca, quantidade, valor_unitario, imagem_url } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!nome || !tipo || !marca || !quantidade || !valor_unitario) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios" });
    }

    // Calcula o valor total do item (quantidade * valor unitário)
    const valor_total = quantidade * valor_unitario;

    // Cria o novo item no banco de dados
    const newItem = await Item.create({
      nome,
      tipo,
      marca,
      quantidade,
      valor_unitario,
      valor_total,
      imagem_url, // Salva a URL da imagem no banco
    });

    // Retorna o novo item criado
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar item" });
  }
});

// Rota para atualizar um item existente
// Quando a rota /:id for acessada com o método PUT, a função updateItem do itemController será chamada
router.put("/:id", itemController.updateItem);

// Rota para excluir um item pelo ID
// Quando a rota /:id for acessada com o método DELETE, a função deleteItem do itemController será chamada
router.delete("/:id", itemController.deleteItem);

// Rota para buscar itens com algum critério de filtro (por exemplo, por nome, tipo, marca, etc.)
router.get("/search", itemController.searchItems);

// Rota para obter um item específico pelo ID
// Quando a rota /:id for acessada com o método GET, busca o item no banco pelo ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;  // Obtendo o ID do item a partir dos parâmetros da URL
    const item = await Item.findByPk(id);  // Busca o item no banco pelo ID

    // Se o item não for encontrado, retorna um erro 404
    if (!item) {
      return res.status(404).json({ error: "Item não encontrado" });
    }

    // Se o item for encontrado, retorna o item
    res.status(200).json(item);
  } catch (error) {
    // Em caso de erro, retorna uma mensagem de erro genérica
    console.error("Erro ao buscar item:", error);
    res.status(500).json({ error: "Erro ao buscar item" });
  }
});

// Exportando o roteador para que ele possa ser usado no servidor
module.exports = router;
