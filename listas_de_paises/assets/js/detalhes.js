$(document).ready(function () {
    try {
        var paisDetalhes = JSON.parse(localStorage.getItem('paisDetalhes'));
        if (!paisDetalhes) {
            window.location.href = 'listapaises.html';
            return;
        }
        // tabela de detalhes do país
        $('#tabela-pais').html(`
        <tr><th>Nome</th><td>${paisDetalhes.translations.por.common}</td></tr>
        <tr><th>Região</th><td>${paisDetalhes.region}</td></tr>
        <tr><th>Subregião</th><td>${paisDetalhes.subregion || "N/A"}</td></tr>
        <tr><th>População</th><td>${paisDetalhes.population.toLocaleString()}</td></tr>
        <tr><th>Capital</th><td>${paisDetalhes.capital ? paisDetalhes.capital[0] : "N/A"}</td></tr>
        <tr><th>Moeda</th><td>${paisDetalhes.currencies ? Object.values(paisDetalhes.currencies).map(currency => currency.name).join(", ") : "N/A"}</td></tr>
        <tr><th>Idioma(s)</th><td>${paisDetalhes.languages ? Object.values(paisDetalhes.languages).join(", ") : "N/A"}</td></tr>
        <tr><th>Localização Geográfica</th><td>Latitude: ${paisDetalhes.latlng ? paisDetalhes.latlng[0] : "N/A"}, Longitude: ${paisDetalhes.latlng ? paisDetalhes.latlng[1] : "N/A"}</td></tr>
        <tr><th>Bandeira</th><td><img src="${paisDetalhes.flags.png}" alt="Bandeira do país"></td></tr>
    `);
        // Log para depuração (opcional)
        console.log("Mostrar tabela");
        // Esconde o loader e exibe a tabela
         $('#loader').removeClass('d-flex').addClass('d-none'); // Corrige classes do Bootstrap
        $('#tabela-pais').show(); // Exibe a tabela com os dados do país
    } catch (e) {
        // Caso ocorra algum erro no código dentro do try
        console.error('Erro ao carregar detalhes do país:', e);
        alert('Erro ao carregar os dados do país.');
        // Esconde o loader em caso de erro
        $('#loader').hide();  // Esconde o loader, mesmo em caso de erro
    }
});
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


//botão loja
document.getElementById('store-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Impede a navegação do link
    
    // Exibe o alerta simples
    alert("Loja está em manutenção");
});

// Botão do carrinho (mensagem de erro)
document.getElementById('carrinho-btn').addEventListener('click', function(event) {
    event.preventDefault(); 

    alert("O carrinho está em manutenção.");
});

