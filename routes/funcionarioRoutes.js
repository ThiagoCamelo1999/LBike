// Importando o Express e o roteador
const express = require("express");
const router = express.Router();


// Importando o modelo Funcionario e o controller relacionado
const Funcionario = require("../models/Funcionario");
const funcionarioController = require("../controllers/funcionarioController");

// Rota para obter todos os funcionários
router.get("/", funcionarioController.getAllFuncionarios);

// Rota para criar um novo funcionário
router.post("/", funcionarioController.createFuncionario);

// Rota para atualizar um funcionário existente
router.put("/:id", funcionarioController.updateFuncionario);

// Rota para excluir um funcionário pelo ID
router.delete("/:id", funcionarioController.deleteFuncionario);

// Rota para obter um funcionário pelo ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;  // Obtendo o id do funcionário dos parâmetros da URL
    const funcionario = await Funcionario.findByPk(id);  // Buscando o funcionário no banco

    // Se o funcionário não for encontrado
    if (!funcionario) {
      return res.status(404).json({ error: "Funcionario não encontrado" });
    }

    // Se o funcionário for encontrado, retornamos ele na resposta
    res.status(200).json(funcionario);
  } catch (error) {
    // Em caso de erro, retornamos uma mensagem de erro
    console.error("Erro ao buscar funcionario:", error);
    res.status(500).json({ error: "Erro ao buscar funcionario" });
  }
});

// Exportando o roteador para ser utilizado no servidor
module.exports = router;
