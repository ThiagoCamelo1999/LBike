// Evento disparado quando o conteúdo da página é completamente carregado
document.addEventListener("DOMContentLoaded", async () => {
    const produtosContainer = document.getElementById("produtos"); // Obtém o container onde os produtos serão exibidos

    try {
        // Faz uma requisição para buscar os produtos da loja
        const response = await fetch("http://localhost:3000/api/loja/produtos");
        const produtos = await response.json(); // Converte a resposta para JSON

        // Verifica se não há produtos para exibir
        if (produtos.length === 0) {
            produtosContainer.innerHTML = "<p>Nenhum produto disponível.</p>"; // Exibe mensagem caso não haja produtos
            return;
        }

        // Para cada produto retornado, cria um elemento HTML e adiciona ao container
        produtos.forEach(produto => {
            const produtoElement = document.createElement("div"); // Cria um novo elemento div para o produto
            produtoElement.classList.add("produto-item"); // Adiciona a classe para estilizar o item do produto

            // Adiciona o conteúdo do produto no formato HTML
            produtoElement.innerHTML = `
                <img src="${produto.imagem_url}" alt="${produto.nome}" class="produto-imagem"/> <!-- Exibe a imagem do produto -->
                <h3>${produto.nome}</h3> <!-- Nome do produto -->
                <p>Marca: ${produto.marca}</p> <!-- Marca do produto -->
                <p>Preço: R$${produto.valor_unitario.toFixed(2)}</p> <!-- Preço do produto formatado com 2 casas decimais -->
                <button onclick="adicionarAoCarrinho(${produto.id}, '${produto.nome}', ${produto.valor_unitario})">Comprar</button> <!-- Botão para adicionar o produto ao carrinho -->
            `;

            // Adiciona o item de produto ao container
            produtosContainer.appendChild(produtoElement);
        });
    } catch (error) {
        // Se ocorrer um erro ao buscar os produtos, exibe uma mensagem de erro
        console.error("Erro ao carregar produtos:", error);
        produtosContainer.innerHTML = "<p>Erro ao carregar produtos.</p>";
    }
});

// Função para adicionar um produto ao carrinho de compras
function adicionarAoCarrinho(produto_id, nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []; // Obtém o carrinho do localStorage ou cria um array vazio se não houver carrinho

    // Verifica se o produto já existe no carrinho
    const itemExistente = carrinho.find(item => item.id === produto_id);

    if (itemExistente) {
        itemExistente.quantidade += 1; // Se o produto já estiver no carrinho, aumenta a quantidade
    } else {
        // Se o produto não estiver no carrinho, adiciona um novo item
        carrinho.push({ id: produto_id, nome, preco, quantidade: 1 });
    }

    // Atualiza o carrinho no localStorage
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${nome} foi adicionado ao carrinho!`); // Exibe um alerta informando que o produto foi adicionado
}
