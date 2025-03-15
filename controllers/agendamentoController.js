const { Agendamento } = require("../models");

// Função para obter todos os agendamentos
// Retorna uma lista com todos os registros na tabela de agendamentos
exports.getAllAgendamentos = async (req, res) => {
  try {
    const agendamentos = await Agendamento.findAll();
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar agendamentos" });
  }
};

// Função para criar um novo agendamento
// Recebe os dados no corpo da requisição e cria um registro na tabela de agendamentos
exports.createAgendamento = async (req, res) => {
  try {
    const novoAgendamento = await Agendamento.create(req.body);
    res.status(201).json(novoAgendamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar agendamento" });
  }
};

// Função para atualizar um agendamento existente
// Recebe o ID nos parâmetros da URL e os dados para atualizar no corpo da requisição
exports.updateAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};

    // Adiciona os campos ao objeto de atualização somente se estiverem presentes na requisição
    if (req.body.cliente_nome !== undefined) updateData.cliente_nome = req.body.cliente_nome;
    if (req.body.cliente_telefone !== undefined) updateData.cliente_telefone = req.body.cliente_telefone;
    if (req.body.cliente_endereco !== undefined) updateData.cliente_endereco = req.body.cliente_endereco;
    if (req.body.servico !== undefined) updateData.servico = req.body.servico;
    if (req.body.data_hora !== undefined) updateData.data_hora = req.body.data_hora;

    // Tenta atualizar o agendamento no banco de dados
    const [updated] = await Agendamento.update(updateData, { where: { id } });

    // Verifica se houve atualização
    if (!updated) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    // Busca o registro atualizado e retorna como resposta
    const updatedAgendamento = await Agendamento.findByPk(id);
    res.status(200).json(updatedAgendamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar agendamento" });
  }
};

// Função para excluir um agendamento
// Recebe o ID nos parâmetros da URL e remove o registro correspondente
exports.deleteAgendamento = async (req, res) => {
  try {
    const { id } = req.params;

    // Tenta remover o agendamento no banco de dados
    const deleted = await Agendamento.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    res.status(200).json({ message: "Agendamento excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir agendamento" });
  }
};

// Função para buscar agendamentos por filtros
// Recebe filtros opcionais de `data` e `cliente` como parâmetros de consulta na URL
exports.searchAgendamentos = async (req, res) => {
  try {
    const { data, cliente } = req.query;
    const whereClause = {};

    // Adiciona filtros ao objeto de consulta, se fornecidos
    if (data) whereClause.data = data;
    if (cliente) whereClause.cliente = cliente;

    // Realiza a consulta ao banco de dados usando os filtros fornecidos
    const agendamentos = await Agendamento.findAll({ where: whereClause });
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar agendamentos" });
  }
};
