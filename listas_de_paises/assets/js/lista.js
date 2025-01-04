// Armazenar o card original para clonagem
var cloneOriginalCard = $('.card-pais').clone();

// Função para pesquisa de país e exibição dos resultados
$('#btn-search').on('click', function () {
    var nomePais = $('#titulo').val().toLowerCase();
    if (!nomePais) {
        alert('Por favor, insira o nome de um país para pesquisar.');
        return;
    }

    $('.lista-paises').html('');

    $.ajax({
        method: 'GET',
        url: 'https://restcountries.com/v3.1/all'
    }).done(function (dados) {
        console.log(dados);

        for (var i = 0; i < dados.length; i++) {
            if (dados[i].translations.por.common.toLowerCase().includes(nomePais)) {
                var cloneCard = cloneOriginalCard.clone().show();

                // Preencher as informações do país no card

                $('.titulo-pais', cloneCard).text(dados[i].translations.por.common);
                $('.tipo', cloneCard).text(dados[i].region);
                $('.subregiao', cloneCard).text(dados[i].subregion || "N/A");
                $('.populacao', cloneCard).text(dados[i].population.toLocaleString());
                $('.imagem-pais', cloneCard).attr("src", dados[i].flags.png);

                cloneCard.find('.btn-ver').on('click', function (event) {
                    event.stopPropagation(); // Impede que o clique no botão acione outros eventos no card
                    var pais = $(this).closest('.card').find('.titulo-pais').text();
                    var paisDetalhes = dados.find(p => p.translations.por.common === pais); // Encontrar o objeto com base no nome

                    // Armazenar os detalhes do país no localStorage
                    localStorage.setItem('paisDetalhes', JSON.stringify(paisDetalhes));

                    // Redirecionar para a página de detalhes
                    window.location.href = 'detalhes.html';
                });

                // Adicionar o card à lista de países
                $('.lista-paises').append(cloneCard);
            }
        }
    }).fail(function () {
        alert('Erro ao carregar os dados da API. Tente novamente mais tarde.');
    });
});

function verDetalhes(nomePais) {
    if (!nomePais) {
        alert('País não encontrado!');
        return;
    }

    // Redireciona para a página de detalhes com o nome do país como parâmetro na URL
    window.location.href = `detalhes.html?pais=${encodeURIComponent(nomePais)}`;
}

//favoritos
$(document).ready(function () {
    // Associar o evento de clique ao botão 
    $(document).on('click', '.btn-favoritos', adicionarAosFavoritos);
});

// Função para adicionar um novo favorito 
function adicionarAosFavoritos() {
    const pais = $(this).closest('.card').find('.titulo-pais').text();
    if (pais) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        if (!favoritos.includes(pais)) {
            favoritos.push(pais);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            alert(`${pais} foi adicionado aos favoritos!`);
        }
        else {
            alert(`${pais} já está nos favoritos!`);
        }
    }
    else {
        alert('Erro ao adicionar aos favoritos.');
    }
}




// Exibir Modal de Login
const loginButton = document.getElementById('login-button');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');


//login
loginButton.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar comportamento padrão do link
    loginModal.classList.add('active'); // Exibir modal
    loginModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    loginModal.classList.remove('active'); // Ocultar modal
    loginModal.classList.add('hidden');
});



//botão loja 
document.getElementById('store-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Impede a navegação do link

    // Exibe o alerta simples
    alert("Loja estáem manutenção");
});

// Botão do carrinho (mensagem de erro)
document.getElementById('carrinho-btn').addEventListener('click', function (event) {
    event.preventDefault();

    alert("O carrinho está em manutenção.");
});

