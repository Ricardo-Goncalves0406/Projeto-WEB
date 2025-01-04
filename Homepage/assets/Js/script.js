const countriesContainer = document.getElementById('countries-container');
let randomCountries = []; // Inicializando como um array vazi
// Fetch API para obter países aleatórios
async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    const randomCountries = countries.sort(() => 0.5 - Math.random()).slice(0, 3);

    const countriesContainer = document.getElementById('countries-container');
    randomCountries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'country-card';
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
        `;
        countriesContainer.appendChild(card);
    });
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



// Inicializar a página dos paises em destaque
document.addEventListener('DOMContentLoaded', fetchCountries);

randomCountries.forEach(country => {
    const card = document.createElement('div');
    card.className = 'country-card';
    card.innerHTML = `
        <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}">
        <h3>${country.name.common}</h3>
        <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Continente:</strong> ${country.region}</p>
    `;
    countriesContainer.appendChild(card);
});

//botão loja (mensagem de erro)
document.getElementById('store-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Impede a navegação do link
    
    // Exibe o alerta simples
    alert("Loja está em manutenção.");
});

// Botão do carrinho (mensagem de erro)
document.getElementById('carrinho-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Impede a navegação do link

    alert("O carrinho está em manutenção.");
});
