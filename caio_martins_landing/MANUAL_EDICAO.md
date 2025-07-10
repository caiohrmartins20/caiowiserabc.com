# Manual de Edição - Landing Page Caio Martins

## 📁 ARQUIVOS DA LANDING PAGE

Sua landing page está na pasta `/caio_martins_landing/` e contém:

- **index.html** - Estrutura e conteúdo da página
- **style.css** - Design, cores e layout
- **script.js** - Funcionalidades interativas
- **logo_final.png** - Seu logo
- **MANUAL_EDICAO.md** - Este manual

## ✏️ COMO EDITAR TEXTOS

### 1. Abrir o arquivo HTML
- Abra o arquivo `index.html` em qualquer editor de texto
- Recomendado: VS Code, Sublime Text, ou Notepad++

### 2. Localizar seções para editar

#### 🎯 HERO SECTION (Topo da página)
```html
<!-- Procure por esta linha no HTML: -->
<h1 class="hero-title">
    <span class="hero-emoji">⏳</span>
    Resultados Reais para Pessoas Reais
</h1>

<!-- Para alterar o slogan, mude o texto: -->
<h1 class="hero-title">
    <span class="hero-emoji">⏳</span>
    SEU NOVO SLOGAN AQUI
</h1>
```

#### 📱 CONTATOS
```html
<!-- Procure por: -->
<p>(11) 99999-9999</p>
<!-- Altere para seu número real: -->
<p>(11) 98765-4321</p>

<!-- Para email: -->
<p>caio@sejawiser.com.br</p>
<!-- Altere para: -->
<p>seu.email@dominio.com</p>
```

#### 📍 ENDEREÇO
```html
<!-- Procure por: -->
<p>Alameda São Caetano, 612<br>Bairro Jardim - Santo André/SP</p>
<!-- Altere para seu endereço real -->
```

### 3. Seções principais para personalizar

#### 📖 SOBRE - Sua História
Procure por: `<section class="sobre" id="sobre">`
- Altere o texto da sua história pessoal
- Modifique os pilares de trabalho

#### 🛠️ SERVIÇOS
Procure por: `<section class="servicos" id="servicos">`
- Adicione/remova serviços
- Altere descrições dos serviços

#### 💬 DEPOIMENTOS
Procure por: `<section class="depoimentos" id="depoimentos">`
- Substitua por depoimentos reais dos seus clientes
- Altere nomes e profissões

## 🎨 COMO ALTERAR CORES

### 1. Abrir o arquivo CSS
- Abra o arquivo `style.css`

### 2. Localizar as variáveis de cores
```css
:root {
    /* Suas cores atuais */
    --azul-marinho: #1B365D;
    --prata-premium: #8C9BAB;
    --marrom-sofisticado: #6B4E3D;
    --cinza-corporativo: #2C3E50;
    --cinza-claro: #F8F9FA;
    --branco-puro: #FFFFFF;
    --preto-sofisticado: #000000;
}
```

### 3. Para alterar uma cor
```css
/* Exemplo: mudar azul marinho para outro azul */
--azul-marinho: #2C5282; /* Novo código de cor */
```

### 4. Códigos de cores úteis
- **Azuis**: #1E40AF, #2563EB, #3B82F6
- **Cinzas**: #374151, #6B7280, #9CA3AF
- **Pretos**: #000000, #1F2937, #111827

## 🖼️ COMO TROCAR IMAGENS

### 1. Substituir o logo
- Substitua o arquivo `logo_final.png` por sua nova imagem
- **IMPORTANTE**: Mantenha o mesmo nome `logo_final.png`
- Ou altere o nome no HTML: `<img src="SEU_NOVO_LOGO.png"`

### 2. Adicionar sua foto
Procure por:
```html
<div class="image-placeholder">
    <span class="placeholder-text">Foto do Caio</span>
    <p class="placeholder-desc">Imagem profissional será inserida aqui</p>
</div>
```

Substitua por:
```html
<img src="sua_foto.jpg" alt="Caio Martins" class="sobre-foto">
```

E adicione este CSS no `style.css`:
```css
.sobre-foto {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(27, 54, 93, 0.15);
}
```

## 📱 CONFIGURAR WHATSAPP

### 1. Alterar número do WhatsApp
No arquivo `script.js`, procure por:
```javascript
const whatsappNumber = '5511999999999';
```

Altere para seu número real:
```javascript
const whatsappNumber = '5511987654321'; // Formato: 55 + DDD + número
```

## 🔧 EDIÇÕES AVANÇADAS

### 1. Adicionar nova seção
```html
<!-- Copie uma seção existente e modifique -->
<section class="nova-secao">
    <div class="container">
        <h2>Título da Nova Seção</h2>
        <p>Conteúdo da seção...</p>
    </div>
</section>
```

### 2. Alterar fontes
No `style.css`, procure por:
```css
--font-primary: 'Montserrat', sans-serif;
--font-secondary: 'Open Sans', sans-serif;
```

### 3. Ajustar espaçamentos
```css
--section-padding: 80px 0; /* Espaçamento entre seções */
--container-max-width: 1200px; /* Largura máxima do conteúdo */
```

## 📱 RESPONSIVIDADE

O site já é responsivo, mas para ajustes:

### 1. Testar em diferentes tamanhos
- Desktop: Largura normal do navegador
- Tablet: Redimensione para ~768px
- Mobile: Redimensione para ~375px

### 2. Ajustar para mobile
No `style.css`, procure por:
```css
@media (max-width: 768px) {
    /* Estilos para mobile aqui */
}
```

## 🚀 COMO PUBLICAR

### 1. Hospedagem gratuita
- **Netlify**: Arraste a pasta para netlify.com
- **Vercel**: Conecte com GitHub
- **GitHub Pages**: Suba para repositório GitHub

### 2. Hospedagem paga
- **Hostinger**: R$ 7,99/mês
- **HostGator**: R$ 12,99/mês
- **GoDaddy**: R$ 15,99/mês

### 3. Domínio personalizado
- Registre: `caiomartins.com.br`
- Configure DNS na hospedagem

## 🛠️ FERRAMENTAS RECOMENDADAS

### Editores de código
- **VS Code** (gratuito) - Recomendado
- **Sublime Text** (pago)
- **Atom** (gratuito)

### Editores online
- **CodePen** - Para testes rápidos
- **JSFiddle** - Para experimentar código

### Geradores de cores
- **Coolors.co** - Paletas de cores
- **Adobe Color** - Harmonias de cores

## ❗ DICAS IMPORTANTES

### ✅ O que PODE fazer
- Alterar textos e conteúdos
- Trocar cores da paleta
- Substituir imagens
- Adicionar/remover seções
- Modificar informações de contato

### ❌ O que EVITAR
- Deletar arquivos CSS ou JS
- Alterar estrutura HTML sem conhecimento
- Remover classes CSS importantes
- Modificar JavaScript sem entender

### 🆘 Se algo der errado
- Mantenha sempre um backup dos arquivos originais
- Teste mudanças uma por vez
- Use Ctrl+Z para desfazer alterações

## 📞 SUPORTE

Se precisar de ajuda com edições mais complexas:
1. Faça backup dos arquivos atuais
2. Descreva exatamente o que quer alterar
3. Envie prints da tela se necessário

**Lembre-se**: Sempre teste as alterações abrindo o arquivo `index.html` no navegador antes de publicar!

---

**🎯 Sua landing page está pronta para conquistar clientes!**
**⏳ Resultados Reais para Pessoas Reais**

