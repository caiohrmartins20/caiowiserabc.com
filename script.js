// NAVEGAÇÃO SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// HEADER SCROLL EFFECT
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#FFFFFF';
        header.style.backdropFilter = 'none';
    }
});

// FORMULÁRIO DE CONTATO
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coleta os dados do formulário
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        interesse: document.getElementById('interesse').value,
        patrimonio: document.getElementById('patrimonio').value,
        mensagem: document.getElementById('mensagem').value
    };
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.telefone || !formData.interesse|| !formData.patrimonio) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Cria mensagem para WhatsApp
    const whatsappMessage = `
🏦 *NOVO CONTATO - CAIO MARTINS*

👤 *Nome:* ${formData.nome}
📧 *Email:* ${formData.email}
📱 *Telefone:* ${formData.telefone}
🎯 *Interesse:* ${formData.interesse}
🏦*Patrimonio:* ${formData.patrimonio}
💬 *Mensagem:*
${formData.mensagem}

⏳ _Enviado através do site - ${new Date().toLocaleString('pt-BR')}_
    `.trim();
    
    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Número do WhatsApp (substitua pelo número real)
    const whatsappNumber = '551194117-4028'; // Formato: 55 + DDD + número
    
    // Abre WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    
    // Feedback para o usuário
    alert('Redirecionando para o WhatsApp! Sua mensagem foi preparada automaticamente.');
    
    // Limpa o formulário
    this.reset();
});

// ANIMAÇÕES AO SCROLL
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
document.querySelectorAll('.servico-card, .diferencial-item, .depoimento-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// CONTADOR ANIMADO PARA ESTATÍSTICAS
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString('pt-BR');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('pt-BR');
        }
    }
    
    updateCounter();
}

// MENU MOBILE (Revisado para layout específico)
function setupHeaderLayout() {
    const headerContent = document.querySelector('.header-content');
    const nav = document.querySelector('.nav');
    const logo = document.querySelector('.logo'); // Assumindo que você tem uma div com classe 'logo' envolvendo a imagem
    const ctaButton = document.querySelector('.header .btn-primary, .header .btn-secondary'); // Pega o botão CTA no header

    // Verifica se os elementos essenciais foram encontrados
    if (!headerContent || !nav || !logo || !ctaButton) {
        console.warn("Elementos do cabeçalho (header-content, nav, logo ou cta-button) não encontrados. Verifique as classes HTML.");
        // Retorna para evitar erros se os elementos não existirem
        return; 
    }

    // Cria botão do menu mobile
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = `
        background: none;
        border: none;
        font-size: 28px; /* Um pouco maior para mobile */
        color: var(--azul-marinho);
        cursor: pointer;
        padding: 0; /* Remove padding padrão */
        display: none; /* Escondido por padrão, mostrado via CSS @media */
        z-index: 10; /* Garante que esteja acima do logo no mobile */
    `;

    // Reorganiza a ordem dos elementos no header para garantir o layout
    // Cria um fragmento para otimizar a manipulação do DOM
    const fragment = document.createDocumentFragment();

    // Adiciona o botão do menu (será o primeiro à esquerda)
    fragment.appendChild(menuButton);

    // Adiciona o logo (será centralizado via CSS)
    fragment.appendChild(logo); 

    // Adiciona o botão CTA (será o último à direita)
    fragment.appendChild(ctaButton);

    // Limpa o headerContent e adiciona os elementos na nova ordem
    headerContent.innerHTML = ''; // Limpa o conteúdo existente
    headerContent.appendChild(fragment);

    // Toggle do menu
    menuButton.addEventListener('click', function() {
        nav.classList.toggle('mobile-nav-open');
        // Adiciona/remove um overlay para fechar o menu ao clicar fora
        if (nav.classList.contains('mobile-nav-open')) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0,0,0,0.5);
                z-index: 990; /* Abaixo do menu, acima do conteúdo */
            `;
            document.body.appendChild(overlay);

            overlay.addEventListener('click', () => {
                nav.classList.remove('mobile-nav-open');
                overlay.remove();
            });
        } else {
            document.querySelector('.mobile-menu-overlay')?.remove();
        }
    });

    // Fecha o menu ao clicar em um link (apenas no mobile)
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            // Verifica se está em tela mobile (menos ou igual a 768px)
            if (window.innerWidth <= 768) {
                nav.classList.remove('mobile-nav-open');
                document.querySelector('.mobile-menu-overlay')?.remove();
            }
        });
    });
}


// LAZY LOADING PARA IMAGENS (quando adicionar imagens reais)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

// SCROLL TO TOP
function createScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '⬆️'; // Alterado para uma seta para cima, mais intuitivo
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--azul-marinho);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(27, 54, 93, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Mostra/esconde botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top ao clicar
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializa scroll to top
createScrollToTop();

// PRELOADER (opcional)
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">📈</div> <div class="preloader-text">Carregando...</div>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const preloaderStyles = document.createElement('style');
    preloaderStyles.textContent = `
        .preloader-content {
            text-align: center;
        }
        
        .preloader-logo {
            font-size: 48px;
            margin-bottom: 20px;
            animation: pulse 1.5s infinite;
        }
        
        .preloader-text {
            font-family: var(--font-primary);
            font-weight: 600;
            color: var(--azul-marinho);
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(preloaderStyles);
    document.body.appendChild(preloader);
    
    // Remove preloader quando página carregar
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Inicializa preloader
createPreloader();

// ANALYTICS E TRACKING (placeholder)
function initAnalytics() {
    // Aqui você pode adicionar Google Analytics, Facebook Pixel, etc.
    console.log('Analytics inicializado');
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Landing Page Caio Martins carregada com sucesso!');
    console.log('⏳ Resultados Reais para Pessoas Reais');
    
    // Inicializa funcionalidades
    lazyLoadImages();
    initAnalytics();
    setupHeaderLayout(); // Chama a nova função de setup do header aqui
});

// PERFORMANCE MONITORING
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Página carregada em ${Math.round(loadTime)}ms`);
});

