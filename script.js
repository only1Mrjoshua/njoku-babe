// DOM Elements
const scenes = document.querySelectorAll('.scene');
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
    typewriter: document.getElementById('typewriter'),
    wishesContainer: document.getElementById('wishesContainer'),
    celebrationText: document.getElementById('celebrationText'),
    celebrationSound: document.getElementById('celebrationSound'),
    soundIcon: document.querySelector('.sound-icon'),
    confettiContainer: document.getElementById('confettiContainer')
};

// Configuration
const CONFIG = {
    wishes: [
        "Your hardworking spirit that inspires me daily",
        "How you care for me like a mother would",
        "The way you carry yourself like a true wife",
        "Our amazing bonding and connection",
        "Every moment we spend together",
        "Your strength and resilience",
        "The way you make me feel loved"
    ],
    typewriterMessages: [
        "Happy New Month, Mon Tresor ✨",
        "My beautiful treasure,",
        "As we welcome this new month together,",
        "I want you to know how much you mean to me.",
        "Every day with you feels like a blessing 💖",
        "I cherish all our moments together.",
        "Your hardworking nature inspires me.",
        "You approach everything with dedication,",
        "and I admire that strength in you.",
        "When you show that motherly side,",
        "caring, nurturing, protecting...",
        "it touches my heart deeply.",
        "You carry yourself with such grace,",
        "like the wife you are to me in every way.",
        "Our bond grows stronger each day.",
        "I'm grateful for every moment.",
        "This month, I pray for you...",
        "May God's favor surround you always.",
        "May your hard work bear beautiful fruits.",
        "May your heart find peace.",
        "May our love continue to grow.",
        "May you be protected from all harm.",
        "Happy Sunday, my love 🤍",
        "May this day bring you rest.",
        "May you feel God's presence today.",
        "May your soul find comfort and joy.",
        "Remember always, Mon Tresor:",
        "You are loved beyond measure.",
        "You are appreciated.",
        "You are my treasure.",
        "I thank God every day for you.",
        "I love you more than yesterday,",
        "but less than tomorrow.",
        "Forever yours 💕"
    ]
};

// State
let currentScene = 'scene1';
let isTyping = false;
let typeIndex = 0;
let charIndex = 0;
let isSoundOn = false;

// Initialize
function init() {
    setupEventListeners();
    disableNoButton();
}

// Event Listeners
function setupEventListeners() {
    buttons.unlock.addEventListener('click', () => switchScene('scene2'));
    buttons.next1.addEventListener('click', () => switchScene('scene3'));
    buttons.next2.addEventListener('click', () => switchScene('scene4'));
    buttons.yes.addEventListener('click', handleYes);
    buttons.no.addEventListener('click', handleNo);
    buttons.replay.addEventListener('click', resetAll);
    buttons.soundToggle.addEventListener('click', toggleSound);
    
    // Start typing when scene2 becomes active
    document.addEventListener('sceneChanged', (e) => {
        if (e.detail.scene === 'scene2') {
            startTyping();
        }
        if (e.detail.scene === 'scene3') {
            createWishes();
        }
    });
}

// Scene Management
function switchScene(sceneId) {
    console.log(`Switching to ${sceneId}`);
    
    // Hide all scenes
    scenes.forEach(scene => {
        scene.classList.remove('active');
    });
    
    // Show target scene
    const targetScene = document.getElementById(sceneId);
    if (targetScene) {
        targetScene.classList.add('active');
        currentScene = sceneId;
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('sceneChanged', {
            detail: { scene: sceneId }
        }));
    }
}

// Typewriter Effect
function startTyping() {
    if (isTyping) return;
    
    isTyping = true;
    typeIndex = 0;
    charIndex = 0;
    elements.typewriter.innerHTML = '';
    
    typeNextLine();
}

function typeNextLine() {
    if (typeIndex >= CONFIG.typewriterMessages.length) {
        isTyping = false;
        return;
    }
    
    const message = CONFIG.typewriterMessages[typeIndex];
    elements.typewriter.innerHTML = '';
    charIndex = 0;
    
    const typeInterval = setInterval(() => {
        if (charIndex < message.length) {
            elements.typewriter.innerHTML += message.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typeInterval);
            typeIndex++;
            
            if (typeIndex < CONFIG.typewriterMessages.length) {
                elements.typewriter.innerHTML += '<br><br>';
                setTimeout(typeNextLine, 800);
            } else {
                isTyping = false;
            }
        }
    }, 40);
}

// Wishes
function createWishes() {
    elements.wishesContainer.innerHTML = '';
    
    CONFIG.wishes.forEach((wish, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'wish-card';
            card.innerHTML = `<p class="wish-text">${wish}</p>`;
            elements.wishesContainer.appendChild(card);
            
            setTimeout(() => {
                card.classList.add('visible');
            }, 10);
        }, index * 300);
    });
}

// Valentine Yes Handler
function handleYes() {
    console.log("YES clicked!");
    
    // Disable and change button
    buttons.yes.disabled = true;
    buttons.yes.textContent = "YES! 💝";
    
    // Play sound if enabled
    if (isSoundOn) {
        elements.celebrationSound.currentTime = 0;
        elements.celebrationSound.play().catch(e => console.log("Sound error:", e));
    }
    
    // Create celebration effects
    createConfetti(100);
    createHeartEffect();
    
    // Set celebration text
    elements.celebrationText.textContent = "My beautiful Mon Tresor, being your Valentine means the world to me. I promise to cherish you, honor you, and love you more with each passing day. You are my treasure, my love, my everything. I can't wait to create more beautiful memories with you this month and always. I love you endlessly. Yours truly, The love of your life 💕";
    
    // Switch to scene5 after 1.5 seconds
    setTimeout(() => {
        console.log("Going to scene5");
        switchScene('scene5');
    }, 1500);
}

// Valentine No Handler
function handleNo(e) {
    e.preventDefault();
    // No button is disabled
}

function disableNoButton() {
    buttons.no.disabled = true;
    buttons.no.style.cursor = 'not-allowed';
}

// Confetti
function createConfetti(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = ['#ff3366', '#ff69b4', '#9370db', '#87ceeb'][Math.floor(Math.random() * 4)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
            
            elements.confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 20);
    }
}

function createHeartEffect() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.top = '50%';
    heart.style.left = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.fontSize = '30px';
    heart.style.zIndex = '1000';
    heart.style.animation = 'pulse 0.5s ease-out';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// Sound
function toggleSound() {
    isSoundOn = !isSoundOn;
    elements.soundIcon.textContent = isSoundOn ? '🔊' : '🔇';
}

// Reset
function resetAll() {
    // Reset scenes
    scenes.forEach(scene => {
        scene.classList.remove('active');
    });
    scenes[0].classList.add('active');
    currentScene = 'scene1';
    
    // Reset elements
    elements.typewriter.innerHTML = '';
    elements.wishesContainer.innerHTML = '';
    elements.confettiContainer.innerHTML = '';
    
    // Reset buttons
    buttons.yes.disabled = false;
    buttons.yes.textContent = 'YES';
    disableNoButton();
    
    // Reset sound
    elements.celebrationSound.pause();
    elements.celebrationSound.currentTime = 0;
    
    // Reset state
    isTyping = false;
    typeIndex = 0;
    charIndex = 0;
}

// Start everything
document.addEventListener('DOMContentLoaded', init);