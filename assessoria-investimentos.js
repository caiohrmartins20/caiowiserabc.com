// =================================================================================
// LANDING PAGE - ASSESSORIA DE INVESTIMENTOS
// =================================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa formulário da landing page
    initLandingPageForm();
});

// Função para inicializar o formulário da landing page
function initLandingPageForm() {
    const form = document.getElementById('form-assessoria');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coleta os dados do formulário
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            patrimonio: document.getElementById('patrimonio').value,
            objetivos: document.getElementById('objetivos').value
        };
        
        // Monta a mensagem para o WhatsApp
        const mensagem = `*Nova Solicitação - Assessoria de Investimentos*\n\n` +
                        `*Nome:* ${formData.nome}\n` +
                        `*E-mail:* ${formData.email}\n` +
                        `*Telefone:* ${formData.telefone}\n` +
                        `*Faixa de Patrimônio:* ${getPatrimonioLabel(formData.patrimonio)}\n` +
                        `*Objetivos:* ${formData.objetivos || 'Não informado'}`;
        
        // Codifica a mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        
        // Redireciona para o WhatsApp
        const whatsappURL = `https://wa.me/5511941174028?text=${mensagemCodificada}`;
        window.open(whatsappURL, '_blank');
        
        // Limpa o formulário
        form.reset();
        
        // Mostra mensagem de sucesso
        alert('Obrigado! Você será redirecionado para o WhatsApp para finalizar o contato.');
    });
}

// Função auxiliar para converter o valor do patrimônio em label
function getPatrimonioLabel(valor) {
    const labels = {
        'ate-100k': 'Até R$ 100 mil',
        '100k-300k': 'R$ 100 mil a R$ 300 mil',
        '300k-1m': 'R$ 300 mil a R$ 1 milhão',
        '1m-3m': 'R$ 1 milhão a R$ 3 milhões',
        'acima-3m': 'Acima de R$ 3 milhões'
    };
    return labels[valor] || valor;
}

