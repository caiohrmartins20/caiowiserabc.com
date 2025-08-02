// Variáveis globais
let currentSlide = 0;
const totalSlides = 13; // Total de depoimentos

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeForm();
    initializePatrimonioSelection();
    initializeSmoothScroll();
});

// ========== CARROSSEL DE DEPOIMENTOS ==========
function initializeCarousel() {
    // Auto-play do carrossel (opcional)
    setInterval(() => {
        moveCarousel(1);
    }, 8000); // Muda a cada 8 segundos
}

function moveCarousel(direction) {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');
    
    // Remove classe active de todos os dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Atualiza slide atual
    currentSlide += direction;
    
    // Loop infinito
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    // Move o carrossel
    const translateX = -currentSlide * 100;
    track.style.transform = `translateX(${translateX}%)`;
    
    // Ativa o dot correspondente
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function currentSlide(slideIndex) {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');
    
    // Remove classe active de todos os dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Atualiza slide atual
    currentSlide = slideIndex - 1;
    
    // Move o carrossel
    const translateX = -currentSlide * 100;
    track.style.transform = `translateX(${translateX}%)`;
    
    // Ativa o dot correspondente
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

// ========== SELEÇÃO DE PATRIMÔNIO ==========
function initializePatrimonioSelection() {
    const patrimonioCards = document.querySelectorAll('.patrimonio-card');
    const faixaInput = document.getElementById('faixa');
    
    patrimonioCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove seleção anterior
            patrimonioCards.forEach(c => c.classList.remove('selected'));
            
            // Adiciona seleção atual
            this.classList.add('selected');
            
            // Atualiza campo hidden
            const faixa = this.getAttribute('data-faixa');
            faixaInput.value = faixa;
        });
    });
}

// ========== FORMULÁRIO DE CONTATO ==========
function initializeForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coleta dados do formulário
        const formData = new FormData(form);
        const nome = formData.get('nome');
        const email = formData.get('email');
        const telefone = formData.get('telefone');
        const faixa = formData.get('faixa');
        const mensagem = formData.get('mensagem');
        
        // Validação básica
        if (!nome || !email || !telefone) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Monta mensagem para WhatsApp
        let whatsappMessage = `Olá Caio! Vim através do seu site.\n\n`;
        whatsappMessage += `*Nome:* ${nome}\n`;
        whatsappMessage += `*E-mail:* ${email}\n`;
        whatsappMessage += `*Telefone:* ${telefone}\n`;
        
        if (faixa) {
            const faixaTexto = getFaixaTexto(faixa);
            whatsappMessage += `*Faixa de Patrimônio:* ${faixaTexto}\n`;
        }
        
        if (mensagem) {
            whatsappMessage += `*Mensagem:* ${mensagem}\n`;
        }
        
        whatsappMessage += `\nGostaria de conversar sobre investimentos!`;
        
        // Codifica mensagem para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Abre WhatsApp
        const whatsappURL = `https://wa.me/5511941174028?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
        
        // Feedback visual
        showSuccessMessage();
        
        // Reset do formulário
        form.reset();
        document.querySelectorAll('.patrimonio-card').forEach(card => {
            card.classList.remove('selected');
        });
    });
}

function getFaixaTexto(faixa) {
    const faixas = {
        'starter': 'Starter (R$ 100k - R$ 300k)',
        'medium': 'Medium (R$ 300k - R$ 1M)',
        'high': 'High (R$ 1M - R$ 5M)',
        'private': 'Private (R$ 5M+)'
    };
    return faixas[faixa] || 'Não informado';
}

function showSuccessMessage() {
    const button = document.querySelector('.btn-submit');
    const originalText = button.textContent;
    
    button.textContent = 'Redirecionando para WhatsApp...';
    button.style.background = '#25D366'; // Cor do WhatsApp
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 3000);
}

// ========== SCROLL SUAVE ==========
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Compensa header fixo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== HEADER DINÂMICO ==========
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-fixed');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#FFFFFF';
        header.style.backdropFilter = 'none';
    }
});

// ========== ANIMAÇÕES DE ENTRADA ==========
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    const animatedElements = document.querySelectorAll('.diferencial-card, .pilar-card, .servico-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Inicializa animações quando a página carrega
document.addEventListener('DOMContentLoaded', initializeAnimations);

// ========== UTILITÁRIOS ==========

// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para formatar telefone
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

// Máscara para telefone
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('telefone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{2})/, '($1');
                } else if (value.length <= 6) {
                    value = value.replace(/(\d{2})(\d{4})/, '($1) $2');
                } else if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    }
});

// ========== MENU MOBILE ==========
function initializeMobileMenu() {
    // Se precisar de menu hambúrguer no futuro
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// ========== PERFORMANCE ==========

// Lazy loading para imagens (se necessário no futuro)
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ========== ANALYTICS (para implementação futura) ==========
function trackEvent(eventName, eventData = {}) {
    // Implementar Google Analytics ou similar
    console.log('Event tracked:', eventName, eventData);
}

// Rastrear cliques importantes
document.addEventListener('click', function(e) {
    if (e.target.matches('.cta-button, .cta-primary, .btn-submit')) {
        trackEvent('CTA_Click', {
            element: e.target.textContent,
            page: window.location.pathname
        });
    }
});

// ========== CONSOLE LOG PARA DEBUG ==========
console.log('🚀 Site do Caio Martins carregado com sucesso!');
console.log('⏳ Resultados Reais para Pessoas Reais');

// Previne erros em produção
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
});

// ========== EXPORTAR FUNÇÕES GLOBAIS ==========
window.moveCarousel = moveCarousel;
window.currentSlide = currentSlide;

