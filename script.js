// Inizializza particles.js con tema più naturale
particlesJS({
    particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: ["#ffffff", "#f0f0f0", "#e0e0e0"] },
        shape: { 
            type: ["circle"],
            stroke: { width: 0, color: "#000000" }
        },
        opacity: {
            value: 0.3,
            random: true,
            animation: { 
                enable: true, 
                speed: 1, 
                minimumValue: 0.1, 
                sync: false 
            }
        },
        size: {
            value: 2,
            random: true,
            animation: { 
                enable: true, 
                speed: 2, 
                minimumValue: 0.1, 
                sync: false 
            }
        },
        line_linked: {
            enable: true,
            distance: 200,
            color: "#ffffff",
            opacity: 0.1,
            width: 1
        },
        move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { 
                enable: true, 
                mode: "repulse"
            },
            onclick: { 
                enable: true, 
                mode: "push"
            },
            resize: true
        }
    },
    retina_detect: true,
    background: {
        color: "#f5f5f5",
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover"
    }
});

// Inizializza il drag and drop con supporto touch
interact('.cat')
    .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        autoScroll: true,
        listeners: {
            start: function(event) {
                // Ferma l'animazione durante il drag
                event.target.style.animation = 'none';
            },
            move: dragMoveListener,
            end: function(event) {
                // Non ripristiniamo più l'animazione dopo il drag
                // event.target.style.animation = 'peek 3s ease-in-out infinite';
            }
        }
    })
    .on('tap', function(event) {
        showRandomCatMessage();
    });

// Inizializza il drag and drop per i messaggi
interact('.message')
    .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        autoScroll: true,
        listeners: {
            move: dragMoveListener
        }
    });

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
    message.setAttribute('data-x', 0);
    message.setAttribute('data-y', 0);
    
    createLoveParticles(
        message.getBoundingClientRect().left + message.offsetWidth / 2,
        message.getBoundingClientRect().top + message.offsetHeight / 2
    );
    
    setTimeout(() => {
        message.classList.remove('show');
        message.classList.add('hide');
    }, 3000);
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
            "Se hai bisogno chiamami",
            "Non vedo l'ora di vederti",
            "TUTTO FVESCO"
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
