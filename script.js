// ================= DOM ELEMENTS =================
const scenes = {
    scene1: document.getElementById('scene1'),
    scene2: document.getElementById('scene2'),
    scene3: document.getElementById('scene3'),
    scene4: document.getElementById('scene4'),
    scene5: document.getElementById('scene5')
};

const buttons = {
    unlock: document.getElementById('unlockBtn'),
    next1: document.getElementById('nextBtn1'),
    next2: document.getElementById('nextBtn2'),
    yes: document.getElementById('yesBtn'),
    no: document.getElementById('noBtn'),
    replay: document.getElementById('replayBtn'),
    soundToggle: document.getElementById('soundToggle')
};

const elements = {
    newMonthGreeting: document.getElementById('newMonthGreeting'),
    typewriter: document.getElementById('typewriter'),
    wishesContainer: document.querySelector('.wishes-container'),
    celebrationText: document.getElementById('celebrationText'),
    confettiContainer: document.getElementById('confettiContainer'),
    celebrationSound: document.getElementById('celebrationSound'),
    soundIcon: document.querySelector('.sound-icon')
};

// ================= CONFIGURATION =================
const CONFIG = {
    herName: "Mon Tresor 💝",
    myName: "Your Man 💖",
    currentMonth: new Date().toLocaleString('default', { month: 'long' }),
    typewriterMessages: [],
    wishes: [
        "Your hardworking spirit that inspires me daily",
        "How you care for me like a mother would",
        "The way you carry yourself like a true wife",
        "Our amazing bonding and connection",
        "Every moment we spend together",
        "Your strength and resilience",
        "The way you make me feel loved"
    ],
    celebrationMessage: ""
};

// ================= STATE VARIABLES =================
let currentScene = 'scene1';
let typewriterIndex = 0;
let charIndex = 0;
let isTyping = false;
let isSoundEnabled = false;

// ================= INITIALIZATION =================
function init() {
    CONFIG.typewriterMessages = [
        `Happy New Month, ${CONFIG.herName} ✨`,
        "My beautiful Mon Tresor,",
        "As we welcome this new month together,",
        "I want you to know how much you mean to me.",
        "Every day with you feels like a blessing 💖",

        "I cherish all the times we spend together,",
        "the laughter, the talks, the quiet moments,",
        "and even the challenges we face as one.",

        "Your hardworking nature inspires me.",
        "You approach everything with such dedication,",
        "and I admire that strength in you.",

        "And when you show that motherly side of you,",
        "caring, nurturing, protecting...",
        "it touches my heart in ways I can't explain.",
        "That part of you is so special to me.",

        "You carry yourself with such grace,",
        "like the wife you are to me in every way.",
        "Our bond grows stronger each day,",
        "and I'm grateful for every moment.",

        "This month, I pray for you...",
        "May God's favor surround you always.",
        "May your hard work bear beautiful fruits.",
        "May your heart find peace in every situation.",
        "May our love continue to grow deeper.",
        "May you be protected from all harm.",

        "Also... happy Sunday, my love 🤍",
        "May this day bring you rest and renewal.",
        "May you feel God's presence strongly today.",
        "May your soul find comfort and joy.",

        "Remember this always, Mon Tresor:",
        "You are loved beyond measure.",
        "You are appreciated more than words can say.",
        "You are my treasure, truly.",
        "And I thank God every day for you.",

        "I love you more than yesterday,",
        "but less than tomorrow.",
        "Forever yours 💕"
    ];

    CONFIG.celebrationMessage = `My beautiful Mon Tresor, being your Valentine means the world to me. I promise to cherish you, honor you, and love you more with each passing day. You are my treasure, my love, my everything. I can't wait to create more beautiful memories with you this month and always. I love you endlessly.`;

    document.querySelector('.month-badge').textContent = CONFIG.currentMonth;
    elements.newMonthGreeting.textContent = `For My Treasure, ${CONFIG.herName}`;
    buttons.no.disabled = true;
    buttons.no.style.cursor = 'not-allowed';

    setupEventListeners();
    toggleSound(false);

    setTimeout(() => {
        if (currentScene === 'scene2') {
            typeNextMessage();
        }
    }, 1000);
}

// ================= EVENT LISTENERS =================
function setupEventListeners() {
    buttons.unlock.addEventListener('click', () => switchScene('scene2'));
    buttons.next1.addEventListener('click', () => switchScene('scene3'));
    buttons.next2.addEventListener('click', () => switchScene('scene4'));
    buttons.yes.addEventListener('click', handleYesClick);
    buttons.no.addEventListener('click', (e) => e.preventDefault());
    buttons.replay.addEventListener('click', resetExperience);
    buttons.soundToggle.addEventListener('click', () => toggleSound(!isSoundEnabled));

    document.addEventListener('click', () => {
        if (!isSoundEnabled) toggleSound(true);
    }, { once: true });

    // Touch/click anywhere to skip typewriter
    elements.typewriter.addEventListener('click', () => {
        if (isTyping && currentScene === 'scene2') {
            completeTypewriter();
        }
    });
}

// ================= RESET EXPERIENCE =================
function resetExperience() {
    currentScene = 'scene1';
    typewriterIndex = 0;
    charIndex = 0;
    isTyping = false;

    Object.values(scenes).forEach(scene => scene.classList.remove('active'));
    scenes.scene1.classList.add('active');

    elements.typewriter.innerHTML = '';
    elements.wishesContainer.innerHTML = '';
    elements.confettiContainer.innerHTML = '';

    buttons.yes.disabled = false;
    buttons.no.disabled = true;
    buttons.no.style.cursor = 'not-allowed';

    elements.celebrationSound.pause();
    elements.celebrationSound.currentTime = 0;
}

// ================= SCENE MANAGEMENT =================
function switchScene(targetScene) {
    scenes[currentScene].classList.remove('active');
    scenes[targetScene].classList.add('active');
    currentScene = targetScene;

    switch (targetScene) {
        case 'scene2':
            setTimeout(() => {
                typewriterIndex = 0;
                charIndex = 0;
                elements.typewriter.innerHTML = '';
                typeNextMessage();
            }, 500);
            break;
        case 'scene3':
            setTimeout(() => createWishCards(), 500);
            break;
        case 'scene4':
            buttons.no.disabled = true;
            buttons.no.style.cursor = 'not-allowed';
            break;
    }
}

// ================= TYPEWRITER EFFECT =================
function typeNextMessage() {
    if (typewriterIndex >= CONFIG.typewriterMessages.length) return;

    isTyping = true;
    const message = CONFIG.typewriterMessages[typewriterIndex];
    elements.typewriter.innerHTML = '';
    charIndex = 0;

    const typeInterval = setInterval(() => {
        if (charIndex < message.length) {
            elements.typewriter.innerHTML += message.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
            typewriterIndex++;

            setTimeout(() => {
                if (typewriterIndex < CONFIG.typewriterMessages.length) {
                    elements.typewriter.innerHTML += '<br><br>';
                    typeNextMessage();
                }
            }, 1500);
        }
    }, 45);
}

function completeTypewriter() {
    if (!isTyping) return;
    
    const message = CONFIG.typewriterMessages[typewriterIndex];
    elements.typewriter.innerHTML = message;
    isTyping = false;
    typewriterIndex++;
    
    if (typewriterIndex < CONFIG.typewriterMessages.length) {
        setTimeout(() => {
            elements.typewriter.innerHTML += '<br><br>';
            typeNextMessage();
        }, 500);
    }
}

// ================= WISH CARDS =================
function createWishCards() {
    elements.wishesContainer.innerHTML = '';

    CONFIG.wishes.forEach((wish, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'wish-card';
            card.innerHTML = `<p class="wish-text">${wish}</p>`;
            elements.wishesContainer.appendChild(card);
            setTimeout(() => card.classList.add('visible'), 10);
        }, index * 350);
    });
}

// ================= YES BUTTON HANDLER =================
function handleYesClick() {
    buttons.yes.disabled = true;
    buttons.yes.textContent = "YES! 💝";

    if (isSoundEnabled) {
        elements.celebrationSound.currentTime = 0;
        elements.celebrationSound.play().catch(e => console.log("Audio play failed"));
    }

    createConfetti(150);
    createHeartBurst();

    setTimeout(() => {
        elements.celebrationText.textContent = CONFIG.celebrationMessage;
        switchScene('scene5');
        
        // Continue celebration
        setTimeout(() => {
            createConfetti(50);
        }, 1000);
    }, 2500);
}

// ================= ANIMATIONS =================
function createConfetti(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            
            const colors = ['#ff3366', '#ff1493', '#9370db', '#8a2be2', '#ff69b4', '#ffb6c1', '#87ceeb'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const size = Math.random() * 10 + 6;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 1;
            confetti.style.animation = `confettiFall ${duration}s linear ${delay}s forwards`;
            
            elements.confettiContainer.appendChild(confetti);

            setTimeout(() => {
                if (confetti.parentNode) confetti.remove();
            }, (duration + delay) * 1000);
        }, i * 10);
    }
}

function createHeartBurst() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.top = '50%';
            heart.style.left = '50%';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.fontSize = '24px';
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            heart.style.animation = `heartBurst ${1 + i * 0.2}s forwards`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), (1 + i * 0.2) * 1000);
        }, i * 200);
    }
}

// ================= SOUND MANAGEMENT =================
function toggleSound(enabled) {
    isSoundEnabled = enabled;
    elements.soundIcon.textContent = enabled ? '🔊' : '🔇';
    buttons.soundToggle.style.background = enabled ? 'rgba(147, 112, 219, 0.3)' : 'rgba(255, 255, 255, 0.1)';
    buttons.soundToggle.style.borderColor = enabled ? '#9370db' : 'rgba(255, 255, 255, 0.2)';
}

// ================= START THE APP =================
document.addEventListener('DOMContentLoaded', init);