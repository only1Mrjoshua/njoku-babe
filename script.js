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
    herName: "Mon Trésor 💖",
    myName: "Baby 💕",
    currentMonth: new Date().toLocaleString('default', { month: 'long' }),
    typewriterMessages: [],
    wishes: [
        "More moments that take your breath away",
        "Success in everything you put your heart into",
        "Protection from all worries and stress",
        "Unexpected joys that make you smile",
        "Everything aligning perfectly for you",
        "Love that grows deeper each day"
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
        "My love for you deepens with every sunrise we witness together.",
        "I cherish every single moment we spend, whether in laughter or quiet understanding.",
        "Our connection is something truly special—a bond that feels like home.",
        "I admire your dedication and how hardworking you are, my love.",
        "You already carry yourself with such grace and care, like a wife would.",
        "And when you show that nurturing, protective side, like a mother...",
        "it makes me fall for you all over again.",
        "Happy Sunday, my beautiful Mon Trésor 💖",
        "May today wrap you in tranquility and gentle moments.",
        "I pray this month brings you profound peace that settles in your soul.",
        "May divine protection surround you in all you do.",
        "May you find strength in moments when challenges arise.",
        "May grace flow abundantly through your life's journey.",
        "May joy find you in both big celebrations and quiet mornings.",
        "May God's guidance light your path with wisdom and clarity.",
        "I love you more than words can fully express.",
        "You are my heart's deepest desire and greatest blessing.",
        "With every beat, my soul whispers your name.",
        "Our journey together is the story I always dreamed of living.",
        "This new month is another chapter in our beautiful love story.",
        "Thank you for being exactly who you are.",
        "For your kindness, your strength, your beautiful heart.",
        "I'm endlessly grateful for you, Mon Trésor 💕"
    ];

    CONFIG.celebrationMessage = `My dearest ${CONFIG.herName}, this marks another beautiful month in our journey together. I love you more than yesterday, and I'm filled with excitement for all the beautiful moments ahead with you. Our story keeps getting better, and I can't wait to write every page with you.`;

    document.querySelector('.month-badge').textContent = CONFIG.currentMonth;
    elements.newMonthGreeting.textContent = `Happy New Month, ${CONFIG.herName}`;
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
    }, 50);
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
        }, index * 300);
    });
}

// ================= YES BUTTON HANDLER =================
function handleYesClick() {
    buttons.yes.disabled = true;

    if (isSoundEnabled) {
        elements.celebrationSound.currentTime = 0;
        elements.celebrationSound.play().catch(e => console.log("Audio play failed"));
    }

    createConfetti(120);
    createHeartBurst();

    setTimeout(() => {
        elements.celebrationText.textContent = CONFIG.celebrationMessage;
        switchScene('scene5');
    }, 2000);
}

// ================= ANIMATIONS =================
function createConfetti(count) {
    elements.confettiContainer.innerHTML = '';

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            const colors = ['#d4af37', '#e6be8a', '#b76e79', '#c9a9a6', '#d8c3a5', '#e8d4c6'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 4;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            const duration = Math.random() * 2 + 2;
            const delay = Math.random() * 1;
            confetti.style.animation = `confettiFall ${duration}s linear ${delay}s forwards`;
            elements.confettiContainer.appendChild(confetti);

            setTimeout(() => {
                if (confetti.parentNode) confetti.remove();
            }, (duration + delay) * 1000);
        }, i * 15);
    }
}

function createHeartBurst() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.top = '50%';
    heart.style.left = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.fontSize = '18px';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'heartBurst 1s forwards';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// ================= SOUND MANAGEMENT =================
function toggleSound(enabled) {
    isSoundEnabled = enabled;
    elements.soundIcon.textContent = enabled ? '🔊' : '🔇';
    buttons.soundToggle.style.background = enabled ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.1)';
    buttons.soundToggle.style.borderColor = enabled ? '#d4af37' : 'rgba(255, 255, 255, 0.2)';
}

// ================= START THE APP =================
document.addEventListener('DOMContentLoaded', init);