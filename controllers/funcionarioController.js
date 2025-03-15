const Funcionario = require("../models/Funcionario");

// Função para obter todos os funcionários
// Retorna uma lista com todos os registros na tabela de funcionários
exports.getAllFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar funcionários" });
  }
};

// Função para criar um novo funcionário
// Recebe os dados no corpo da requisição, valida-os e cria um registro na tabela de funcionários
exports.createFuncionario = async (req, res) => {
  const { nome, cpf, telefone, endereco, dias_trabalhados, valor_pago } = req.body;

  // Validação dos campos obrigatórios
  if (
    !nome ||
    !cpf ||
    !telefone ||
    !endereco ||
    dias_trabalhados == null || // Verifica se é nulo ou undefined
    valor_pago == null
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    // Cria o registro no banco de dados
    const novoFuncionario = await Funcionario.create({
      nome,
      cpf,
      telefone,
      endereco,
      dias_trabalhados,
      valor_pago,
    });

    res.status(201).json(novoFuncionario);
  } catch (error) {
    console.error("Erro ao criar funcionário:", error);
    res.status(500).json({ error: "Erro ao criar funcionário" });
  }
};

// Função para atualizar os dados de um funcionário
// Recebe o ID nos parâmetros da URL e os dados para atualizar no corpo da requisição
exports.updateFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};

    // Adiciona os campos ao objeto de atualização somente se estiverem presentes na requisição
    if (req.body.nome !== undefined) updateData.nome = req.body.nome;
    if (req.body.telefone !== undefined) updateData.telefone = req.body.telefone;
    if (req.body.endereco !== undefined) updateData.endereco = req.body.endereco;
    if (req.body.dias_trabalhados !== undefined)
      updateData.dias_trabalhados = req.body.dias_trabalhados;
    if (req.body.valor_pago !== undefined) updateData.valor_pago = req.body.valor_pago;

    // Atualiza o registro no banco de dados
    const [updated] = await Funcionario.update(updateData, { where: { id } });

    // Verifica se o registro foi encontrado e atualizado
    if (!updated) {
      return res.status(404).json({ error: "Funcionário não encontrado" });
    }

    // Busca o registro atualizado para retornar como resposta
    const updatedFuncionario = await Funcionario.findByPk(id);
    res.status(200).json(updatedFuncionario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar funcionário" });
  }
};

// Função para excluir um funcionário
// Recebe o ID nos parâmetros da URL e remove o registro correspondente
exports.deleteFuncionario = async (req, res) => {
  const { id } = req.params;

  try {
    // Remove o registro no banco de dados
    const deleted = await Funcionario.destroy({ where: { id } });

    // Verifica se o registro foi encontrado e excluído
    if (!deleted) {
      return res.status(404).json({ error: "Funcionário não encontrado" });
    }

    res.status(200).json({ message: "Funcionário excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir funcionário" });
  }
};
