/* client.js – socket handling & UI logic */
const socket = io(); // auto‑connects to same origin

// Generate a random nickname for this user (visible in chat)
function generateNickname() {
    const adjectives = ['Cozy', 'Sunny', 'Mellow', 'Spicy', 'Breezy'];
    const nouns = ['Panda', 'Fox', 'Owl', 'Koala', 'Llama'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj}${noun}`;
}
const myName = generateNickname();

// ---------- Helper ----------
function randomId(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
}

// ---------- 1️⃣ Room handling ----------
let roomId = null;

// Parse ?room= from URL or create a new one
function initRoom() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('room')) {
        roomId = params.get('room');
    } else {
        // No room yet – wait for user to click “Create Room”
        document.getElementById('createRoomBtn').addEventListener('click', () => {
            roomId = randomId();
            window.location.search = `?room=${roomId}`;
        });
        return;
    }

    // Join the room on the server and announce our nickname
    socket.emit('joinRoom', { roomId, author: myName });
    console.log('Joined room', roomId, 'as', myName);
}

// ---------- 2️⃣ Iframe navigation ----------
const iframe = document.getElementById('sharedIframe');

// When the user types a new URL (you could add an input box later)
// For demo, we’ll listen to a double‑click on the iframe to prompt a URL
iframe.addEventListener('load', () => {
    // Notify the other peer about the current URL
    const currentUrl = iframe.contentWindow.location.href;
    socket.emit('navigate', { roomId, url: currentUrl });
});

socket.on('navigate', ({ url }) => {
    // Update iframe only if the URL is different
    const proxied = `/proxy?url=${encodeURIComponent(url)}`;
    if (iframe.src !== proxied) iframe.src = proxied;
});

// ---------- 3️⃣ Play / pause sync ----------
iframe.addEventListener('load', () => {
    // Try to hook into HTML5 video if present
    const video = iframe.contentWindow.document.querySelector('video');
    if (video) {
        // Forward play/pause events
        video.addEventListener('play', () => socket.emit('play', { roomId }));
        video.addEventListener('pause', () => socket.emit('pause', { roomId }));
    }
});

// ---------- URL bar handling ----------
const loadBtn = document.getElementById('loadUrlBtn');
const urlInput = document.getElementById('urlInput');
if (loadBtn && urlInput) {
    loadBtn.addEventListener('click', () => {
        const raw = urlInput.value.trim();
        if (!raw) return;
        const proxied = `/proxy?url=${encodeURIComponent(raw)}`;
        iframe.src = proxied;
        // Notify the other peer about navigation
        socket.emit('navigate', { roomId, url: raw });
    });
}

socket.on('play', () => {
    const video = iframe.contentWindow.document.querySelector('video');
    if (video) video.play();
});
socket.on('pause', () => {
    const video = iframe.contentWindow.document.querySelector('video');
    if (video) video.pause();
});

// ---------- 4️⃣ Chat ----------
const chatLog = document.getElementById('chatLog');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendChatBtn');

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    // Use our generated nickname as the author for the remote side
    const author = myName;
    addChatMessage('You', text); // locally show as "You"
    socket.emit('chat', { roomId, message: text, author });
    chatInput.value = '';
}

socket.on('chat', ({ author, message }) => {
    // If the message came from us, show "You" instead of our nickname
    const displayName = author === myName ? 'You' : author;
    addChatMessage(displayName, message);
});

function addChatMessage(author, message) {
    const div = document.createElement('div');
    div.innerHTML = `<span class="author">${author}:</span> <span class="msg">${message}</span>`;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// ---------- Initialise ----------
initRoom();
