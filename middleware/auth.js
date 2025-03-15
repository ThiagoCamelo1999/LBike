// Importando a biblioteca jwt para trabalhar com tokens de autenticação
const jwt = require("jsonwebtoken");
// Definindo uma chave secreta que será usada para criar e verificar os tokens
const SECRET_KEY = "chave_secreta"; // 🔹 A mesma chave usada no seu `authController.js`

// Função de middleware para autenticar usuários
const autenticar = (req, res, next) => {
  // Obtém o token do cabeçalho da requisição. O token vem depois de "Bearer "
  const token = req.headers.authorization?.split(" ")[1]; // Remove a parte "Bearer " e pega o token real

  // Se o token não estiver presente, retorna um erro de acesso não autorizado
  if (!token) {
    return res.status(401).json({ error: "Acesso não autorizado. Token ausente." });
  }

  try {
    // Tenta verificar o token usando a chave secreta
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Se o token for válido, armazena os dados decodificados no objeto de requisição
    req.user = decoded; // Armazena os dados do usuário na requisição
    
    // Chama a próxima função (continuando o fluxo da requisição)
    next();
  } catch (error) {
    // Se o token for inválido ou expirado, retorna um erro
    res.status(403).json({ error: "Token inválido ou expirado" });
  }
};

// Expondo a função de autenticação para ser usada em outros arquivos
module.exports = autenticar;
