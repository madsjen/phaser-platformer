const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
	console.log('a user connected:')
})

http.listen(3000, () => {
  console.log('listening on *:3000');
});
