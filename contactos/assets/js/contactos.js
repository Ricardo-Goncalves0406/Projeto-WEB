// Exibir Modal de Login
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

//botão da loja (mensagem de erro)
document.getElementById('store-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Impede a navegação do link
    
    // Exibe o alerta simples
    alert("Loja em manutenção");
});

// Botão do carrinho (mensagem de erro)
document.getElementById('carrinho-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Impede a navegação do link

    alert("O carrinho está em manutenção.");
});
