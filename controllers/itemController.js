// Importando o modelo "Item" para interagir com a tabela de itens no banco de dados
const { Item } = require("../models");

// Função para obter todos os itens
// Esta função vai buscar todos os registros de itens no banco de dados
exports.getAllItems = async (req, res) => {
  try {
    // Busca todos os itens na tabela "Item"
    const items = await Item.findAll();
    // Retorna os itens encontrados com status 200 (sucesso)
    res.status(200).json(items);
  } catch (error) {
    // Caso ocorra algum erro, retorna status 500 e a mensagem de erro
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar itens" });
  }
};

// Função para atualizar os dados de um item
// A atualização é feita com base no ID do item e nos dados fornecidos no corpo da requisição
exports.updateItem = async (req, res) => {
  try {
    // Obtém o ID do item a ser atualizado a partir dos parâmetros da URL
    const { id } = req.params;
    const updateData = {}; // Objeto que vai armazenar os dados a serem atualizados

    // Verifica se o campo foi enviado na requisição e adiciona ao objeto de atualização
    if (req.body.nome !== undefined) updateData.nome = req.body.nome;
    if (req.body.tipo !== undefined) updateData.tipo = req.body.tipo;
    if (req.body.marca !== undefined) updateData.marca = req.body.marca;
    if (req.body.quantidade !== undefined) updateData.quantidade = req.body.quantidade;
    if (req.body.valor_unitario !== undefined) updateData.valor_unitario = req.body.valor_unitario;

    // Se quantidade e valor unitário foram fornecidos, calcula o valor total
    if (req.body.quantidade !== undefined && req.body.valor_unitario !== undefined) {
      updateData.valor_total = req.body.quantidade * req.body.valor_unitario;
    }

    // Verifica se o item existe no banco de dados antes de tentar atualizá-lo
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "Item não encontrado" }); // Se o item não existir, retorna erro 404
    }

    // Atualiza os dados do item com as novas informações
    await item.update(updateData);
    // Retorna o item atualizado
    res.status(200).json(item);
  } catch (error) {
    // Caso ocorra algum erro, retorna status 500 e a mensagem de erro
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar item" });
  }
};

// Função para excluir um item
// Recebe o ID do item e tenta removê-lo da tabela
exports.deleteItem = async (req, res) => {
  try {
    // Obtém o ID do item a ser excluído
    const { id } = req.params;

    // Verifica se o item existe no banco de dados antes de tentar excluí-lo
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "Item não encontrado" }); // Se o item não existir, retorna erro 404
    }

    // Exclui o item do banco de dados
    await item.destroy();
    // Retorna uma mensagem de sucesso após a exclusão
    res.status(200).json({ message: "Item excluído com sucesso" });
  } catch (error) {
    // Caso ocorra algum erro, retorna status 500 e a mensagem de erro
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir item" });
  }
};

// Função para buscar itens com base em critérios (filtros)
// Aceita filtros de nome, tipo e marca como parâmetros da URL e retorna os itens correspondentes
exports.searchItems = async (req, res) => {
  try {
    // Obtém os parâmetros da query string (nome, tipo, marca) da URL
    const { nome, tipo, marca } = req.query;
    const whereClause = {}; // Objeto que irá armazenar os filtros

    // Adiciona os filtros ao objeto de consulta se forem passados na URL
    if (nome) whereClause.nome = nome;
    if (tipo) whereClause.tipo = tipo;
    if (marca) whereClause.marca = marca;

    // Consulta os itens no banco de dados com base nos filtros
    const items = await Item.findAll({ where: whereClause });
    // Retorna os itens encontrados
    res.status(200).json(items);
  } catch (error) {
    // Caso ocorra algum erro, retorna status 500 e a mensagem de erro
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar itens" });
  }
};

// Função para buscar um item específico pelo ID
// Retorna o item correspondente ao ID fornecido nos parâmetros da URL
exports.getItemById = async (req, res) => {
  try {
    // Obtém o ID do item a partir dos parâmetros da URL
    const { id } = req.params;
    // Busca o item no banco de dados pelo ID
    const item = await Item.findByPk(id);

    // Se o item não for encontrado, retorna erro 404
    if (!item) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Retorna o item encontrado
    res.status(200).json(item);
  } catch (error) {
    // Caso ocorra algum erro, retorna status 500 e a mensagem de erro
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
};

