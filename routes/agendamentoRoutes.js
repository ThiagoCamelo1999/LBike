// Importando o Express e o roteador
const express = require("express");
const router = express.Router();


// Importando o modelo Agendamento e o controller relacionado
const { Agendamento } = require("../models");
const agendamentoController = require("../controllers/agendamentoController");

// Rota para obter todos os agendamentos
router.get("/", agendamentoController.getAllAgendamentos);

// Rota para criar um novo agendamento
router.post("/", agendamentoController.createAgendamento);

// Rota para atualizar um agendamento existente
router.put("/:id", agendamentoController.updateAgendamento);

// Rota para excluir um agendamento pelo ID
router.delete("/:id", agendamentoController.deleteAgendamento);

// Rota para obter um agendamento pelo ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;  // Obtendo o id do agendamento dos parâmetros da URL
    const agendamento = await Agendamento.findByPk(id);  // Buscando o agendamento no banco

    // Se o agendamento não for encontrado
    if (!agendamento) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    // Se o agendamento for encontrado, retornamos ele na resposta
    res.status(200).json(agendamento);
  } catch (error) {
    // Em caso de erro, retornamos uma mensagem de erro
    console.error("Erro ao buscar agendamento:", error);
    res.status(500).json({ error: "Erro ao buscar agendamento" });
  }
});

// Exportando o roteador para ser utilizado no servidor
module.exports = router;
