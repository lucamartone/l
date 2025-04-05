// Array di messaggi per l'alieno
const alienMessages = [
    "LARA NUN MOLLA",
    "SALUTAMI SCOOBY",
    "TUTTO FVESCO",
    "♥️",
    "🕷️"
];

// Gestore degli eventi per l'alieno
const alien = document.querySelector('.cat');
alien.addEventListener('click', showRandomAlienMessage);
alien.addEventListener('dblclick', function(event) {
    event.preventDefault();
    currentZoom = 1;
    updateZoom();
});

function showRandomAlienMessage() {
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = alienMessages[Math.floor(Math.random() * alienMessages.length)];
    
    const messagesContainer = document.querySelector('.messages-container') || createMessagesContainer();
    messagesContainer.appendChild(message);
    
    // Calcola una posizione casuale sullo schermo
    const containerWidth = messagesContainer.clientWidth;
    const containerHeight = messagesContainer.clientHeight;
    const messageWidth = message.offsetWidth;
    const messageHeight = message.offsetHeight;
    
    // Genera posizioni casuali
    const randomX = Math.floor(Math.random() * (containerWidth - messageWidth));
    const randomY = Math.floor(Math.random() * (containerHeight - messageHeight));
    
    message.style.left = `${randomX}px`;
    message.style.top = `${randomY}px`;
    
    setTimeout(() => {
        message.classList.add('show');
    }, 50);
}

function createMessagesContainer() {
    const container = document.createElement('div');
    container.className = 'messages-container';
    document.body.appendChild(container);
    return container;
}

function dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function createLoveParticles(x, y) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'love-particles';
        particle.innerHTML = '💞';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 150 + 'px');
        particle.style.setProperty('--ty', (Math.random() - 0.5) * 150 + 'px');
        particle.style.animation = `love-particle 1s ease-out forwards`;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

function showMessage(messageId, text) {
    const message = document.getElementById(messageId);
    const cat = document.querySelector('.cat');
    const catRect = cat.getBoundingClientRect();
    
    message.textContent = text;
    message.classList.remove('hide');
    message.classList.add('show');
    
    // Posiziona il messaggio sopra il gatto
    const messageX = catRect.left + (catRect.width / 2);
    const messageY = catRect.top - 20; // 20px sopra il gatto
    
    message.style.left = `${messageX}px`;
    message.style.top = `${messageY}px`;
    message.style.transform = 'translate(-50%, -100%) scale(1)';
    
    createLoveParticles(
        message.getBoundingClientRect().left + message.offsetWidth / 2,
        message.getBoundingClientRect().top + message.offsetHeight / 2
    );
    
    // Aumenta il tempo di visualizzazione del messaggio
    setTimeout(() => {
        message.classList.remove('show');
        message.classList.add('hide');
    }, 4000); // Aumentato da 3000 a 4000ms
}

let messageCount = 0;

function showRandomCatMessage() {
    let message;
    if (messageCount < 3) {
        message = "LARA NUN MOLLA";
    } else if (messageCount < 6) {
        message = "SALUTAMI SCOOBY";
    } else {
        const messages = [
            "LARA NUN MOLLA",
            "SALUTAMI SCOOBY",
            "TUTTO FVESCO",
            "♥️"
        ];
        message = messages[Math.floor(Math.random() * messages.length)];
    }
    messageCount++;
    showMessage('catMessage', message);
}

// Rimuovo il blocco dello scroll su iOS per permettere lo zoom
// document.addEventListener('touchmove', function(e) {
//     if (e.target.classList.contains('cat')) {
//         e.preventDefault();
//     }
// }, { passive: false });

// Rimuovo il codice dei pulsanti di zoom e mantengo solo il pinch-to-zoom
let currentZoom = 1;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;

function updateZoom() {
    const container = document.querySelector('.container');
    container.style.transform = `scale(${currentZoom})`;
    container.style.transformOrigin = 'center center';
}

// Aggiungi il pinch-to-zoom
let initialDistance = 0;
let initialZoom = 1;

document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        initialDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        initialZoom = currentZoom;
    }
});

document.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const currentDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        
        const scale = currentDistance / initialDistance;
        const newZoom = initialZoom * scale;
        
        if (newZoom >= MIN_ZOOM && newZoom <= MAX_ZOOM) {
            currentZoom = newZoom;
            updateZoom();
        }
    }
}, { passive: false }); 
