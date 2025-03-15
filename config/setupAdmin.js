// Importando o bcrypt para criptografar a senha
const bcrypt = require("bcrypt");
// Importando o modelo de "Usuario", que representa as informações dos usuários no banco de dados
const Usuario = require("../models/Usuario");

// Função para criar a conta do dono
const criarDono = async () => {
  try {
    // Dados fixos do dono (admin)
    const email = "admin@lbike.com"; // Endereço de e-mail do dono
    const senha = "admin123"; // 🔹 Senha fixa para o dono
    const cpf = "000.000.000-00"; // 🔹 CPF padrão para o dono
    const telefone = "(00) 00000-0000"; // 🔹 Telefone padrão para o dono
    const endereco = "Endereço do Dono"; // 🔹 Endereço padrão para o dono

    // Verifica se já existe um dono cadastrado com o mesmo e-mail
    const donoExiste = await Usuario.findOne({ where: { email } });

    // Se o dono não existir, cria a conta
    if (!donoExiste) {
      // Criptografa a senha antes de salvar no banco de dados
      const hashedSenha = await bcrypt.hash(senha, 10);
      
      // Cria o novo usuário (dono) no banco de dados com as informações fornecidas
      await Usuario.create({
        nome: "Dono", // Nome do dono
        cpf,           // CPF do dono
        telefone,      // Telefone do dono
        endereco,      // Endereço do dono
        email,         // E-mail do dono
        senha: hashedSenha, // Senha criptografada
        tipo_usuario: "dono", // Tipo de usuário: dono
      });
      
      // Exibe mensagem indicando que a conta foi criada com sucesso
      console.log("✅ Conta do dono criada com sucesso!");
    } else {
      // Se a conta já existir, exibe uma mensagem informando
      console.log("⚠️ Conta do dono já existe.");
    }
  } catch (error) {
    // Se houver algum erro durante o processo, exibe uma mensagem de erro
    console.error("Erro ao criar a conta do dono:", error);
  }
};

// Chama a função para criar o dono
criarDono();
