// Variáveis globais
let currentSlide = 0;
let autoSlideInterval;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initForm();
    initScrollSmooth();
    initPhoneFormat();
});

// ===== CARROSSEL DE DEPOIMENTOS MODERNO =====
function initCarousel() {
    const slides = document.querySelectorAll('.depoimento-card');
    const indicators = document.querySelectorAll('.indicator');
    if (slides.length === 0 || indicators.length === 0) return;

    showSlide(0);

    // Auto-slide
    autoSlideInterval = setInterval(() => {
        nextSlide(slides, indicators);
    }, 10000); // 10 segundos

    // Eventos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel(slides, indicators);
            resetAutoSlide(slides, indicators);
        });
    });

    // Pausar auto-slide quando hover no carrossel
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carousel.addEventListener('mouseleave', () => startAutoSlide(slides, indicators));
    }
}

function showSlide(index) {
    const slides = document.querySelectorAll('.depoimento-card');
    const indicators = document.querySelectorAll('.indicator');
    if (slides.length === 0 || indicators.length === 0) return;

    slides.forEach(slide => slide.style.display = 'none');
    indicators.forEach(ind => ind.classList.remove('active'));

    slides[index].style.display = 'flex';
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide(slides, indicators) {
    currentSlide++;
    if (currentSlide >= slides.length) currentSlide = 0;
    updateCarousel(slides, indicators);
}

function updateCarousel(slides, indicators) {
    slides.forEach(slide => slide.style.display = 'none');
    indicators.forEach(ind => ind.classList.remove('active'));

    slides[currentSlide].style.display = 'flex';
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function resetAutoSlide(slides, indicators) {
    clearInterval(autoSlideInterval);
    startAutoSlide(slides, indicators);
}

function startAutoSlide(slides, indicators) {
    autoSlideInterval = setInterval(() => {
        nextSlide(slides, indicators);
    }, 10000);
}

// ===== MENU MOBILE =====
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
}

// ===== FORMULÁRIO DE CONTATO =====
function initForm() {
    const form = document.getElementById('contatoForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (!data.nome || !data.email || !data.telefone || !data.patrimonio) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        sendWhatsApp(data);
    });
}

function sendWhatsApp(data) {
    const capitalizeFirst = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const toLowerCase = str => str.toLowerCase();

    const message = `
Olá, Caio! Vim através do seu site.

Nome: ${capitalizeFirst(data.nome)}
E-mail: ${toLowerCase(data.email)}
Telefone: ${data.telefone}
Faixa de Patrimônio: ${data.patrimonio}
Objetivos: ${toLowerCase(data.objetivos || 'não informado')}

Gostaria de agendar uma conversa com você.
    `;
    
    const whatsappNumber = '5511941174028';
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    alert('Formulário enviado! Você será redirecionado para o WhatsApp.');

    setTimeout(() => window.open(whatsappLink, '_blank'), 1000);

    form.reset();
}

// ===== SCROLL SUAVE =====
function initScrollSmooth() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const headerHeight = document.querySelector('.header-fixed').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;

            window.scrollTo({ top: targetPosition, behavior: 'smooth' });

            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
            }
        });
    });
}

// ===== FORMATO TELEFONE =====
function initPhoneFormat() {
    const phoneInput = document.getElementById('telefone');
    if (!phoneInput) return;
    phoneInput.addEventListener('input', function() {
        formatPhone(this);
    });
}

function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 10) value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    else if (value.length > 5) value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    else if (value.length > 2) value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    else value = value.replace(/^(\d*)/, '($1');
    input.value = value;
}
