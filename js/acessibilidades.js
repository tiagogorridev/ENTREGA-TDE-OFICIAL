//CONTRASTE

const contrastToggle = document.getElementById('contrast-toggle');
const body = document.body;
contrastToggle.addEventListener('click', () => {
    const state = contrastToggle.getAttribute('data-state');
    if (state === 'normal') {
        body.classList.add('high-contrast');
        contrastToggle.textContent = 'Baixo Contraste';
        contrastToggle.setAttribute('aria-label', 'Ativar baixo contraste');
        contrastToggle.setAttribute('data-state', 'high');
    } else {
        body.classList.remove('high-contrast');
        contrastToggle.textContent = 'Alto Contraste';
        contrastToggle.setAttribute('aria-label', 'Ativar alto contraste');
        contrastToggle.setAttribute('data-state', 'normal');
    }
});

//TAMANHO FONTE
const increaseFontBtn = document.getElementById('increase-font');
const decreaseFontBtn = document.getElementById('decrease-font');

const adjustFontSize = (adjustment) => {
    const elements = document.querySelectorAll('body *:not(svg):not(img)');
    elements.forEach(element => {
        const style = window.getComputedStyle(element);
        const fontSize = parseFloat(style.fontSize);
        // Evita fontes menores que 10px ou maiores que 30px
        if (fontSize + adjustment >= 10 && fontSize + adjustment <= 30) {
            element.style.fontSize = (fontSize + adjustment) + 'px';
        }
    });
};

increaseFontBtn.addEventListener('click', () => adjustFontSize(1));
decreaseFontBtn.addEventListener('click', () => adjustFontSize(-1));

//LER PAGINA INTEIRA
const screenReaderButton = document.getElementById("screen-reader-toggle");

const readPageContent = () => {
    const content = document.body.innerText; // Captura todo o texto visível no corpo da página
    const utterance = new SpeechSynthesisUtterance(content); // Cria uma instância de leitura
    utterance.lang = "pt-BR"; // Define o idioma como Português do Brasil
    utterance.onend = () => {
        screenReaderButton.textContent = "Ler Página";
        screenReaderButton.setAttribute("aria-label", "Ativar leitura da página");
    };
    speechSynthesis.speak(utterance); // Inicia a leitura
};

screenReaderButton.addEventListener("click", () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        screenReaderButton.textContent = "Ler Página";
        screenReaderButton.setAttribute("aria-label", "Ativar leitura da página");
    } else {
        screenReaderButton.textContent = "Parar de Ler";
        screenReaderButton.setAttribute("aria-label", "Parar leitura da página");
        readPageContent();
    }
});

//LER TEXTO
const readText = (text, button) => {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        button.textContent = "Ler Seção";
        button.setAttribute("aria-label", "Ativar leitura da seção");
    } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR'; // Define o idioma como Português do Brasil
        utterance.onend = () => {
            button.textContent = "Ler Seção";
            button.setAttribute("aria-label", "Ativar leitura da seção");
        };
        speechSynthesis.speak(utterance); // Inicia a leitura
        button.textContent = "Parar de Ler";
        button.setAttribute("aria-label", "Parar leitura da seção");
    }
};

document.querySelectorAll('.read-section').forEach((button) => {
    button.addEventListener('click', () => {
        const section = button.closest('.section-container');
        let content = '';
        const header = section.querySelector('h1, h2');
        if (header) content += header.textContent + '. ';
        const paragraphs = section.querySelectorAll('p');
        paragraphs.forEach((p) => {
            content += p.textContent + ' ';
        });
        const figcaption = section.querySelector('figcaption');
        if (figcaption) {
            content += 'Descrição da imagem: ' + figcaption.textContent + '. ';
        }
        readText(content, button);
    });
});
