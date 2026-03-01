// server.js
const express = require('express');
const http = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ---------- 1️⃣ Serve static UI ----------
app.use(express.static(path.join(__dirname, 'public')));

// ---------- 2️⃣ Proxy endpoint ----------
app.get('/proxy', (req, res) => {
    const target = req.query.url;
    if (!target) {
        return res.status(400).send('Missing ?url= query parameter');
    }

    // Create a proxy that removes X‑Frame‑Options and CSP headers
    const proxy = createProxyMiddleware({
        target,
        changeOrigin: true,
        selfHandleResponse: true,
        onProxyRes: (proxyRes, req, res) => {
            // Strip security headers that block iframes
            delete proxyRes.headers['x-frame-options'];
            delete proxyRes.headers['content-security-policy'];
            delete proxyRes.headers['x-content-security-policy'];
            delete proxyRes.headers['x-webkit-csp'];
        },
        onProxyReq: (proxyReq, req, res) => {
            // Ensure the request is a GET (the proxy works for any GET URL)
            proxyReq.method = 'GET';
        },
        onError: (err, req, res) => {
            console.error('Proxy error:', err);
            res.status(500).send('Proxy error');
        },
    });

    proxy(req, res);
});

// ---------- 3️⃣ Socket.io – room & sync ----------
const rooms = new Map(); // roomId -> Set of socket IDs

io.on('connection', socket => {
    console.log('🔌 New socket:', socket.id);

    // Join a room (client sends {roomId})
    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
        if (!rooms.has(roomId)) rooms.set(roomId, new Set());
        rooms.get(roomId).add(socket.id);
        console.log(`🟢 ${socket.id} joined ${roomId}`);
    });

    // Forward navigation, play/pause, chat to the other peer(s)
    socket.on('navigate', ({ roomId, url }) => {
        socket.to(roomId).emit('navigate', { url });
    });

    socket.on('play', ({ roomId }) => socket.to(roomId).emit('play'));
    socket.on('pause', ({ roomId }) => socket.to(roomId).emit('pause'));

    socket.on('chat', ({ roomId, message, author }) => {
        socket.to(roomId).emit('chat', { message, author });
    });

    // Cleanup when a socket disconnects
    socket.on('disconnect', () => {
        console.log('❌ Socket disconnected:', socket.id);
        rooms.forEach((sockets, roomId) => {
            sockets.delete(socket.id);
            if (sockets.size === 0) {
                rooms.delete(roomId);
                console.log(`🧹 Room ${roomId} removed (empty)`);
            }
        });
    });
});

// ---------- 4️⃣ Start server ----------
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
