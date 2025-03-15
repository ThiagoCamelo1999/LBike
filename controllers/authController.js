const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const SECRET_KEY = "chave_secreta";

// Registro de usuário
exports.register = async (req, res) => {
  try {
    const { nome, cpf, telefone, endereco, email, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    const cpfExistente = await Usuario.findOne({ where: { cpf } });

    if (usuarioExistente) return res.status(400).json({ error: "Email já cadastrado" });
    if (cpfExistente) return res.status(400).json({ error: "CPF já cadastrado" });

    const hashedSenha = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({
      nome,
      cpf,
      telefone,
      endereco,
      email,
      senha: hashedSenha,
      tipo_usuario: "cliente",
    });

    res.status(201).json({ message: "Conta criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

// Login do usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) return res.status(401).json({ error: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ error: "Senha incorreta" });

    const token = jwt.sign({ id: usuario.id, tipo_usuario: usuario.tipo_usuario }, SECRET_KEY, { expiresIn: "2h" });

    res.json({
      token,
      nome: usuario.nome,  // ✅ Corrigido: agora retorna o nome do usuário
      tipo_usuario: usuario.tipo_usuario
    });

  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};
