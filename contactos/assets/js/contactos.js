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