// Variáveis globais
let currentSlide = 0;
let slides, indicators;
let autoSlideInterval;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar variáveis após DOM carregar
    slides = document.querySelectorAll('.depoimento-card');
    indicators = document.querySelectorAll('.indicator');
    
    initCarousel();
    initForm();
});

// ===== CARROSSEL DE DEPOIMENTOS =====

function initCarousel() {
    if (slides.length === 0) return;
    
    showSlide(0);
    startAutoSlide();
    
    // Pausar auto-slide quando hover no carrossel
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
}

function showSlide(n) {
    console.log('showSlide called with:', n, 'currentSlide:', currentSlide); // Debug
    
    if (!slides || slides.length === 0) {
        console.log('No slides found'); // Debug
        return;
    }
    
    // Esconder todos os slides
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        slide.style.display = 'none';
        console.log('Hiding slide', index); // Debug
    });
    
    // Remover active de todos os indicadores
    if (indicators) {
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
    }
    
    // Ajustar índice se necessário
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    console.log('Showing slide:', currentSlide); // Debug
    
    // Mostrar slide atual
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.display = 'flex';
        console.log('Slide', currentSlide, 'is now active'); // Debug
    }
    
    // Ativar indicador correspondente
    if (indicators && indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    console.log('nextSlide called, current:', currentSlide); // Debug
    currentSlide++;
    showSlide(currentSlide);
    resetAutoSlide();
}

function prevSlide() {
    console.log('prevSlide called, current:', currentSlide); // Debug
    currentSlide--;
    showSlide(currentSlide);
    resetAutoSlide();
}

function currentSlideFunc(n) {
    currentSlide = n - 1;
    showSlide(currentSlide);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 30000); // 30 segundos
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// ===== MENU MOBILE =====

    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {



// ===== FORMULÁRIO DE CONTATO =====

function initForm() {
    const form = document.getElementById('contatoForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    if (!data.nome || !data.email || !data.telefone || !data.patrimonio) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Redirecionar diretamente para WhatsApp
    sendWhatsApp(data);
}

function sendWhatsApp(data) {
    // Função para capitalizar primeira letra
    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    
    // Função para deixar em minúscula
    function toLowerCase(str) {
        return str.toLowerCase();
    }
    
    const message = `
Olá, Caio! Vim através do seu site.

Nome: ${capitalizeFirst(data.nome)}
E-mail: ${toLowerCase(data.email)}
Telefone: ${data.telefone}
Faixa de Patrimônio: ${toLowerCase(data.patrimonio)}
Objetivos: ${toLowerCase(data.objetivos || 'não informado')}

Gostaria de agendar uma conversa com você.
    `;
    
    const whatsappNumber = '5511941174028';
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Mostrar mensagem de sucesso
    alert('Formulário enviado! Você será redirecionado para o WhatsApp.');
    
    // Redirecionar para WhatsApp após 1 segundo
    setTimeout(() => {
        window.open(whatsappLink, '_blank');
    }, 1000);
    
    // Limpar formulário
    document.getElementById('contatoForm').reset();
}

// ===== SCROLL SUAVE =====

// Adicionar scroll suave para links internos
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header-fixed').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto

// Aplicar formatação de telefone
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhone(this);
        });
    }
});

// ===== EXPOSIÇÃO DE FUNÇÕES GLOBAIS =====

// Expor funções para uso nos botões HTML
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.currentSlide = currentSlideFunc;
