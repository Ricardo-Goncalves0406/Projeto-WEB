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

// Carregar os detalhes do país na página de detalhes
$(document).ready(function () {
    var paisDetalhes = JSON.parse(localStorage.getItem('paisDetalhes')); // Recupera os dados armazenados no localStorage

    if (paisDetalhes) {
        var tabela = $('#tabela-pais'); // Seleciona o <tbody> onde os dados serão injetados

        // Preencher a tabela com as informações do país
        tabela.append('<tr><td><b>Nome:</b></td><td>' + paisDetalhes.translations.por.common + '</td></tr>');
        tabela.append('<tr><td><b>Capital:</b></td><td>' + (paisDetalhes.capital ? paisDetalhes.capital[0] : 'N/A') + '</td></tr>');
        tabela.append('<tr><td><b>Região:</b></td><td>' + paisDetalhes.region + '</td></tr>');
        tabela.append('<tr><td><b>Sub-região:</b></td><td>' + (paisDetalhes.subregion || 'N/A') + '</td></tr>');
        tabela.append('<tr><td><b>Idiomas:</b></td><td>' + (paisDetalhes.languages ? Object.values(paisDetalhes.languages).join(', ') : 'N/A') + '</td></tr>');
        tabela.append('<tr><td><b>Moeda:</b></td><td>' + (paisDetalhes.currencies ? Object.values(paisDetalhes.currencies)[0].name : 'N/A') + '</td></tr>');
        tabela.append('<tr><td><b>População:</b></td><td>' + paisDetalhes.population.toLocaleString() + '</td></tr>');
        tabela.append('<tr><td><b>Localização Geográfica:</b></td><td>' + (paisDetalhes.latlng ? 'Latitude: ' + paisDetalhes.latlng[0] + ', Longitude: ' + paisDetalhes.latlng[1] : 'N/A') + '</td></tr>');
    } else {
        alert('Erro ao carregar os detalhes do país.');
    }
});
