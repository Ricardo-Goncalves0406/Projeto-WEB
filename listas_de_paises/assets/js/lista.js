// Armazenar o card original para clonagem
var cloneOriginalCard = $('.card-pais').clone();

// Função para pesquisa de país e exibição dos resultados
$('#btn-search').on('click', function () {
    var nomePais = $('#titulo').val().toLowerCase();
    if (!nomePais) {
        alert('Por favor, insira o nome de um país para pesquisar.');
        return;
    }

    $('.lista-paises').html(''); // Limpar resultados anteriores

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

                // Adicionar o evento de clique para armazenar os detalhes no localStorage e redirecionar
                cloneCard.on('click', function () {
                    var pais = $(this).find('.titulo-pais').text();
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

// Exibir Modal de Login
const loginButton = document.getElementById('login-button');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');


loginButton.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar comportamento padrão do link
    loginModal.classList.add('active'); // Exibir modal
    loginModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    loginModal.classList.remove('active'); // Ocultar modal
    loginModal.classList.add('hidden');
});

// Fechar modal ao clicar fora
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.classList.remove('active'); // Ocultar modal
        loginModal.classList.add('hidden');
    }
});

