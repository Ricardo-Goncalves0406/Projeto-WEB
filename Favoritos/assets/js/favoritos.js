// Função para adicionar um novo favorito
function adicionarAosFavoritos() {
    const pais = $(this).closest('.card').find('.titulo-pais').text();
    const flagUrl = $(this).closest('.card').find('.imagem-pais').attr('src'); // URL da bandeira
    const region = $(this).closest('.card').find('.tipo').text(); // Região do país

    if (pais && flagUrl && region) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        // Verificar se o país já está nos favoritos
        if (!favoritos.some(fav => fav.name === pais)) {
            // Adicionar o país com as informações completas
            favoritos.push({ name: pais, flagUrl: flagUrl, region: region });
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            alert(`${pais} foi adicionado aos favoritos!`);
        } else {
            alert(`${pais} já está nos favoritos!`);
        }
    } else {
        alert('Erro ao adicionar aos favoritos.');
    }
}

// Função para exibir os favoritos na tabela
function mostrarFavoritos() {
    // Recuperar os favoritos do localStorage
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    console.log(favoritos);

    const listaFavoritos = document.getElementById('favoritos-list');
    listaFavoritos.innerHTML = '';

    // Verificar se há favoritos
    if (favoritos.length === 0) {
        listaFavoritos.innerHTML = '<tr><td colspan="3">Nenhum país favorito encontrado.</td></tr>';
    } else {
        // Exibir os favoritos
        favoritos.forEach(function (pais) {
            // Verificar se o país tem todas as propriedades necessárias
            if (pais && pais.name && pais.flagUrl && pais.region) {
                // Adicionar uma linha para cada favorito
                const row = document.createElement('tr');

                // Coluna para o nome do país
                const nameCell = document.createElement('td');
                nameCell.textContent = pais.name;
                row.appendChild(nameCell);

                // Coluna para a bandeira
                const flagCell = document.createElement('td');
                const img = document.createElement('img');
                img.src = pais.flagUrl;  // Adicionando a URL da bandeira
                img.alt = 'Bandeira';
                img.style.width = '40px';
                flagCell.appendChild(img);
                row.appendChild(flagCell);

                // Coluna para a região
                const regionCell = document.createElement('td');
                regionCell.textContent = pais.region;
                row.appendChild(regionCell);

                
                listaFavoritos.appendChild(row);
            }
        });
    }
}

// Chamar a função para exibir os favoritos ao carregar a página
window.onload = mostrarFavoritos;



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


//botão loja (mensagem de erro)
document.getElementById('store-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Impede a navegação do link

    // Exibe o alerta simples
    alert("Loja está em manutenção.");
});

// Botão do carrinho (mensagem de erro)
document.getElementById('carrinho-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Impede a navegação do link

    alert("O carrinho está em manutenção.");
});

