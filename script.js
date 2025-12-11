// =================================================================================
// INICIALIZAÇÃO GERAL
// =================================================================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicia todas as funcionalidades da página
    initCoverFlowCarousel();
    initForm();
    initScrollSmooth();
    initPhoneFormat();
});


// =================================================================================
// CARROSSEL DE DEPOIMENTOS "COVER FLOW 3D"
// =================================================================================
function initCoverFlowCarousel() {
    const carouselWrapper = document.getElementById('carousel-wrapper');
    if (!carouselWrapper) return;

    // --- DADOS DOS DEPOIMENTOS ---
    // Mantemos os dados aqui para facilitar a manutenção e deixar o HTML limpo.
    const testimonials = [
        { name: "Theus", role: "Empresário", text: "Estou muito satisfeito com a consultoria que recebo do Caio. Ele leva bem em conta o meu perfil, avaliando a situação financeira, meus objetivos, o horizonte de tempo. Em nossas conversas posso dizer que é bem transparente sobre os riscos e custos envolvidos nas estratégias de investimento que apresenta." },
        { name: "Noely", role: "Arquiteta", text: "Compreendeu meu perfil de investimento e está sempre atento e oferecendo os melhores produtos que atendam minhas exigências." },
        { name: "Gilberto", role: "Empresário", text: "Caio, parabéns pelo trabalho e resultados obtidos. Estou muito satisfeito pela assessoria e atendimento diário." },
        { name: "Renata", role: "Empresária e aposentada", text: "Conheci o Caio através de meu filho... apesar de ser muito jovem demonstra muito conhecimento na área, me deixou bastante tranquila. Estou muito satisfeita principalmente com a atenção e o cuidado." },
        { name: "Márcio", role: "Empresário", text: "Como cliente do Caio e da Wiser, super indico essa modalidade de ter alguém atuando comigo e para mim no acompanhamento de meus investimentos. O poder de decisão fica mais próximo das atualizações do mercado." },
        { name: "Cliente", role: "Empresário", text: "Desde o início do nosso contato, Caio tem se mostrado um profissional atencioso, proativo e sempre disposto a esclarecer dúvidas com clareza e cordialidade... tenho tido uma boa impressão de sua postura e dedicação." },
        { name: "Analuiza", role: "Aposentada", text: "Sua dedicação, profissionalismo e disponibilidade me transmitem muita confiança nas decisões financeiras. Muito obrigada!" },
        { name: "Raphael", role: "Massagista", text: "Atendimento de excelência, com clareza, agilidade e total comprometimento. Um suporte indispensável nas minhas decisões financeiras." },
        { name: "Austin e Kátia", role: "Administrador de bens e assistente executiva", text: "Podemos recomendar o Caio e seus colegas de forma plena pela assessoria financeira profissional e pelo suporte que sempre nos ofereceram." },
        { name: "Fabiana Guimarães", role: "Empresária", text: "Venho expressar minha satisfação em ter o Caio Martins como assessor. O Caio é um profissional muito atencioso e prestativo, com um atendimento excelente, oferece soluções personalizadas e nos auxilia de maneira clara e eficiente." },
        { name: "Matheus Guimarães", role: "Empresário", text: "Trabalho com o Caio já faz alguns anos e gosto muito do jeito que ele conduz tudo. O trabalho dele é sempre bem pensado e feito de acordo com o meu perfil de investidor. É alguém em quem confio de verdade." },
        { name: "Jéssica Marré", role: "Empresária", text: "Gostaria de deixar registrada minha satisfação com o atendimento prestado pelo Caio. Demonstrou profissionalismo, conhecimento técnico e, acima de tudo, comprometimento com meus objetivos financeiros." },
        { name: "Emerson Brandão", role: "Empresário", text: "Antes de iniciar o acompanhamento com Caio Martins, minhas finanças pareciam um quebra-cabeça complexo. Desde o primeiro contato, senti uma confiança imediata. Hoje, sinto uma segurança incomparável em relação ao meu dinheiro e ao meu futuro." }
    ];

    // --- CRIAÇÃO DINÂMICA DOS CARDS ---
    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'depoimento-card';
        card.innerHTML = `
            <div class="depoimento-content">
                <p>"${testimonial.text}"</p>
                <div class="depoimento-autor">
                    <strong>${testimonial.name}</strong>
                    <span>${testimonial.role}</span>
                </div>
            </div>
        `;
        carouselWrapper.appendChild(card);
    });

    // --- LÓGICA DO CARROSSEL ---
    const cards = document.querySelectorAll('.depoimento-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let autoSlideInterval;

    function updateCarousel(animate = true) {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
            
            if (!animate) {
                card.style.transition = 'none';
            } else {
                card.style.transition = '';
            }

            const diff = index - currentIndex;
            
            if (diff === 0) {
                card.classList.add('active');
            } else if (diff === -1 || (currentIndex === 0 && index === cards.length - 1)) {
                card.classList.add('prev');
            } else if (diff === 1 || (currentIndex === cards.length - 1 && index === 0)) {
                card.classList.add('next');
            } else if (diff === -2 || (currentIndex <= 1 && index >= cards.length - 2 + currentIndex)) {
                card.classList.add('far-prev');
            } else if (diff === 2 || (currentIndex >= cards.length - 2 && index <= 1 - (cards.length - currentIndex))) {
                card.classList.add('far-next');
            } else {
                // Esconde os outros cards para não poluir a tela
                if (diff < 0) card.classList.add('far-prev');
                else card.classList.add('far-next');
            }
        });
        
        // Força um reflow para garantir que a transição seja aplicada corretamente
        if (!animate) {
            void carouselWrapper.offsetWidth;
            cards.forEach(card => card.style.transition = '');
        }
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval); // Limpa qualquer intervalo anterior
        autoSlideInterval = setInterval(showNext, 10000); // 10 segundos
    }

    // --- EVENTOS ---
    prevBtn.addEventListener('click', () => {
        showPrev();
        startAutoSlide(); // Reinicia o timer ao navegar manualmente
    });

    nextBtn.addEventListener('click', () => {
        showNext();
        startAutoSlide();
    });
    
    // Permite clicar nos cards laterais para navegar
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (index !== currentIndex) {
                currentIndex = index;
                updateCarousel();
                startAutoSlide();
            }
        });
    });

    // Pausar quando o mouse está sobre o carrossel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    // --- INICIALIZAÇÃO ---
    updateCarousel(false); // Carrega a primeira visualização sem animação
    startAutoSlide();
}


// =================================================================================
// FORMULÁRIO DE CONTATO
// =================================================================================
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

        sendWhatsApp(data, form); // Passa o 'form' para a função
    });
}

function sendWhatsApp(data, form) {
    const capitalizeFirst = str => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
    const toLowerCase = str => str ? str.toLowerCase() : '';

    const message = `Olá, Caio! Vim através do seu site.

*Nome:* ${data.nome}
*E-mail:* ${toLowerCase(data.email)}
*Telefone:* ${data.telefone}
*Faixa de Patrimônio:* ${data.patrimonio}
*Objetivos:* ${data.objetivos || 'Não informado'}

Gostaria de agendar uma conversa com você.`;
    
    const whatsappNumber = '5511941174028';
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message )}`;

    // Feedback visual para o usuário
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.innerText = 'Enviando...';
    submitButton.disabled = true;

    setTimeout(() => {
        window.open(whatsappLink, '_blank');
        
        // Resetar o formulário e o botão após o envio
        form.reset();
        submitButton.innerText = 'Vamos Conversar!';
        submitButton.disabled = false;
    }, 1000);
}


// =================================================================================
// SCROLL SUAVE PARA ÂNCORAS
// =================================================================================
function initScrollSmooth() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Ignora links que não são âncoras internas
            if (targetId === '#' || !document.querySelector(targetId)) return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            const headerHeight = document.querySelector('.header-fixed').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20; // Offset de 20px

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}


// =================================================================================
// FORMATADOR DE TELEFONE (MÁSCARA)
// =================================================================================
function initPhoneFormat() {
    const phoneInput = document.getElementById('telefone');
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 11); // Limita a 11 dígitos (DDD + 9 dígitos)
        
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d*)/, '($1) $2');
        } else if (value.length > 0) {
            value = value.replace(/^(\d*)/, '($1');
        }
        
        e.target.value = value;
    });
}
