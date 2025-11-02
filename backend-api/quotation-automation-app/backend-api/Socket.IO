const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http, { cors: { origin: "*" } });

http.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

io.on('connection', (socket) => {
  console.log('Client connected to socket.io', socket.id);
});
