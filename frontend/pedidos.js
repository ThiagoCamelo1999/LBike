// Espera o carregamento completo do conteúdo da página
document.addEventListener("DOMContentLoaded", async () => {
    // Obtém a referência para a tabela onde os pedidos serão exibidos
    const tabelaPedidos = document.getElementById("tabela-pedidos");

    try {
        // Faz uma requisição para a API de pedidos
        const response = await fetch("http://localhost:3000/api/pedidos");
        // Converte a resposta em formato JSON
        const pedidos = await response.json();

        // Verifica se não há pedidos ou se a lista de pedidos está vazia
        if (!pedidos || pedidos.length === 0) {
            // Caso não haja pedidos, exibe uma mensagem na tabela
            tabelaPedidos.innerHTML = "<tr><td colspan='6'>Nenhum pedido finalizado</td></tr>";
            return;
        }

        // Itera sobre os pedidos e adiciona cada um como uma linha na tabela
        pedidos.forEach(pedido => {
            const row = document.createElement("tr"); // Cria uma nova linha na tabela
            row.innerHTML = `
                <td>${pedido.cliente_nome}</td> <!-- Exibe o nome do cliente -->
                <td>${pedido.produto ? pedido.produto.nome : "Produto não encontrado"}</td> <!-- Exibe o nome do produto ou uma mensagem de erro -->
                <td>${pedido.produto ? pedido.produto.marca : "-"}</td> <!-- Exibe a marca do produto ou um traço caso não exista -->
                <td>${pedido.quantidade}</td> <!-- Exibe a quantidade de produtos no pedido -->
                <td>R$ ${pedido.total.toFixed(2)}</td> <!-- Exibe o total do pedido formatado como valor monetário -->
                <td>${pedido.status}</td> <!-- Exibe o status do pedido -->
            `;
            // Adiciona a linha criada na tabela
            tabelaPedidos.appendChild(row);
        });

    } catch (error) {
        // Caso ocorra algum erro durante a requisição, exibe o erro no console
        console.error("Erro ao carregar pedidos:", error);
    }

    // Função assíncrona que carrega os pedidos com um token de autenticação (não está sendo utilizada no momento)
    async function carregarPedidos() {
        try {
            // Faz uma requisição para carregar os pedidos com token de autenticação
            const pedidos = await fetchComToken("http://localhost:3000/api/pedidos");
            // Exibe os pedidos no console (para fins de depuração)
            console.log("Pedidos carregados:", pedidos);
        } catch (error) {
            // Caso ocorra erro, exibe o erro com um alerta
            alert(error.message);
        }
    }
});
