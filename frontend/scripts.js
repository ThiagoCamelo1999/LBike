const API_BASE_URL = "http://localhost:3000/api"; // Base URL da API

// Função para criar um novo recurso (POST)
async function createResource(endpoint, data) {
  // Envia uma requisição POST para criar um recurso na API
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
    },
    body: JSON.stringify(data), // Converte os dados para JSON antes de enviar
  });

  // Verifica se a resposta da requisição é OK (status 200)
  if (!response.ok) {
    throw new Error("Erro ao criar recurso"); // Lança um erro caso não seja OK
  }
  return await response.json(); // Retorna os dados da resposta como JSON
}

// Função para obter todos os recursos (GET)
async function getAllResources(endpoint) {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`); // Envia uma requisição GET para obter recursos
  if (!response.ok) {
    throw new Error("Erro ao buscar recursos"); // Lança um erro caso a resposta não seja OK
  }
  return await response.json(); // Retorna os dados da resposta como JSON
}

// Função para atualizar um recurso existente (PUT)
async function updateResource(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "PUT", // Define o método como PUT para atualização
    headers: {
      "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
    },
    body: JSON.stringify(data), // Converte os dados para JSON antes de enviar
  });

  // Verifica se a resposta da requisição é OK (status 200)
  if (!response.ok) {
    throw new Error("Erro ao atualizar recurso"); // Lança um erro caso não seja OK
  }

  return await response.json(); // Retorna os dados da resposta como JSON
}

// Função para buscar um recurso pelo ID (GET)
async function getResourceById(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`); // Envia uma requisição GET para buscar um recurso
    if (!response.ok) {
      // Caso a resposta não seja OK, captura e exibe detalhes do erro
      const errorDetails = await response.text();
      console.error(
        `Erro na resposta: ${response.status} - ${response.statusText}`
      );
      console.error(`Detalhes do erro: ${errorDetails}`);
      throw new Error("Erro ao buscar o recurso"); // Lança um erro
    }
    return await response.json(); // Retorna os dados do recurso como JSON
  } catch (error) {
    console.error("Erro na requisição:", error.message); // Exibe o erro no console
    throw error; // Lança o erro para ser tratado fora da função
  }
}

// Função para o carrossel de imagens
let slideIndex = 0; // Variável para controlar o índice do slide atual

// Função para exibir as imagens no carrossel
function showSlides() {
  const slides = document.querySelectorAll(".carrossel-images img"); // Seleciona todas as imagens do carrossel
  slides.forEach((slide, index) => {
    slide.style.display = index === slideIndex ? "block" : "none"; // Exibe a imagem atual e esconde as outras
  });
}

// Função para mover o carrossel para o próximo/previo slide
function moveSlide(n) {
  const slides = document.querySelectorAll(".carrossel-images img"); // Seleciona todas as imagens do carrossel
  slideIndex = (slideIndex + n + slides.length) % slides.length; // Calcula o próximo slide (circular)
  showSlides(); // Atualiza a exibição do carrossel
}

showSlides(); // Chama a função para exibir o slide inicial

// Função para fazer requisições com token de autenticação
async function fetchComToken(url, metodo = "GET", body = null) {
  const token = localStorage.getItem("token"); // Obtém o token armazenado no localStorage

  // Verifica se o token existe, caso contrário, redireciona para a página de login
  if (!token) {
    alert("Usuário não autenticado. Faça login.");
    window.location.href = "login.html"; // Redireciona para a página de login
    return;
  }

  // Configurações da requisição com o token
  const opcoes = {
    method: metodo, // Método da requisição (GET, POST, PUT, etc.)
    headers: {
      "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
      "Authorization": `Bearer ${token}`, // Envia o token no cabeçalho de autorização
    },
  };

  // Se houver um corpo de dados, adiciona na requisição
  if (body) {
    opcoes.body = JSON.stringify(body);
  }

  // Envia a requisição com as configurações acima
  const response = await fetch(url, opcoes);

  // Verifica se a resposta é OK, caso contrário, lança um erro
  if (!response.ok) {
    throw new Error("Erro ao buscar dados.");
  }

  return response.json(); // Retorna os dados da resposta como JSON
}
