// Importa o módulo express para criar as rotas da aplicação
const express = require("express");
// Cria um roteador para gerenciar as rotas
const router = express.Router();
// Importa o controlador de autenticação, onde estão as funções de login e registro
const authController = require("../controllers/authController"); 

// Rota POST para o registro de um novo usuário
// Quando alguém fizer um POST em "/register", a função "register" do authController será chamada
router.post("/register", authController.register); 

// Rota POST para o login de um usuário
// Quando alguém fizer um POST em "/login", a função "login" do authController será chamada
router.post("/login", authController.login); 

// Exporta o roteador para que ele possa ser utilizado em outros arquivos da aplicação
module.exports = router;
