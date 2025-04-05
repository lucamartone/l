// Inizializza particles.js con tema Arcane
particlesJS({
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: ["#00ffff", "#ff00ff", "#ffffff"] },
        shape: { 
            type: ["circle", "triangle", "polygon"],
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 6 }
        },
        opacity: {
            value: 0.5,
            random: true,
            animation: { 
                enable: true, 
                speed: 1, 
                minimumValue: 0.1, 
                sync: false 
            }
        },
        size: {
            value: 3,
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
            distance: 150,
            color: "#00ffff",
            opacity: 0.4,
            width: 1,
            shadow: {
                enable: true,
                color: "#00ffff",
                blur: 5
            }
        },
        move: {
            enable: true,
            speed: 1,
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
                mode: "repulse",
                parallax: {
                    enable: true,
                    force: 60,
                    smooth: 10
                }
            },
            onclick: { 
                enable: true, 
                mode: "push",
                particles_nb: 4
            },
            resize: true
        }
    },
    retina_detect: true,
    background: {
        color: "#0a0a1a",
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
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'love-particles';
        particle.innerHTML = '❤️';
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
    
    // Posiziona il messaggio accanto al gatto
    const messageX = catRect.left + catRect.width + 20; // 20px di distanza dal gatto
    const messageY = catRect.top + (catRect.height / 2);
    
    message.style.left = `${messageX}px`;
    message.style.top = `${messageY}px`;
    message.style.transform = 'translate(0, -50%) scale(1)';
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
            "Se hai bisogno chiamami",
            "Non vedo l'ora di vederti"
        ];
        message = messages[Math.floor(Math.random() * messages.length)];
    }
    messageCount++;
    showMessage('catMessage', message);
}

// Prevenire lo scroll su iOS
document.addEventListener('touchmove', function(e) {
    if (e.target.classList.contains('cat')) {
        e.preventDefault();
    }
}, { passive: false }); 