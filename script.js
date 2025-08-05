// Variáveis globais
let currentSlide = 0;
const slides = document.querySelectorAll('.depoimento-card');
const indicators = document.querySelectorAll('.indicator');
let autoSlideInterval;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initForm();
    initMobileMenu();
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
    // Esconder todos os slides
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });
    
    // Remover active de todos os indicadores
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Ajustar índice se necessário
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    // Mostrar slide atual
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.display = 'flex';
    }
    
    // Ativar indicador correspondente
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
    resetAutoSlide();
}

function prevSlide() {
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

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (mobileMenu && menuToggle) {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (mobileMenu && menuToggle) {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
}

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
    
    // Preparar dados para envio
    const emailData = {
        to: 'caio.martins@wiseaai.com.br',
        subject: `Novo contato do site - ${data.nome}`,
        body: `
Nome: ${data.nome}
E-mail: ${data.email}
Telefone: ${data.telefone}
Faixa de Patrimônio: ${data.patrimonio}
Objetivos: ${data.objetivos || 'Não informado'}

Enviado através do site caiowiserabc.com
Data: ${new Date().toLocaleString('pt-BR')}
        `
    };
    
    // Enviar por email (usando mailto como fallback)
    sendEmail(emailData);
    
    // Também redirecionar para WhatsApp
    sendWhatsApp(data);
}

function sendEmail(emailData) {
    const subject = encodeURIComponent(emailData.subject);
    const body = encodeURIComponent(emailData.body);
    const mailtoLink = `mailto:${emailData.to}?subject=${subject}&body=${body}`;
    
    // Tentar abrir cliente de email
    window.open(mailtoLink, '_blank');
}

function sendWhatsApp(data) {
    const message = `
Olá Caio! Vim através do seu site.

*Nome:* ${data.nome}
*E-mail:* ${data.email}
*Telefone:* ${data.telefone}
*Faixa de Patrimônio:* ${data.patrimonio}
*Objetivos:* ${data.objetivos || 'Não informado'}

Gostaria de conversar sobre investimentos!
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
                closeMobileMenu();
            }
        });
    });
});

// ===== ANIMAÇÕES DE SCROLL =====

// Observador para animações quando elementos entram na tela
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animações aos elementos quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.diferencial-card, .pilar-card, .servico-card, .segmento-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== UTILITÁRIOS =====

// Função para formatar telefone
function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        if (value.length < 14) {
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
    }
    
    input.value = value;
}

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
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;

