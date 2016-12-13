'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const lobbys = [];

io.on('connection', (socket) => {
	socket.on('disconnecting', () => {
		const roomId = Object.keys(socket.rooms)[1];

		delete io.sockets.adapter.rooms[roomId].sockets[socket.id]

		io.to(roomId).emit('lobby:change', io.sockets.adapter.rooms[roomId].sockets);
	});

	socket.on('lobby:join', (lobbyName) => {
		if(lobbys.indexOf(lobbyName) !== -1) {
			socket.join(`lobby/${lobbyName}`);
			socket.emit('lobby:join', true);
			return;
		}

		socket.emit('lobby:join', false);
	})

	socket.on('lobby:init', (lobbyName) => {
		if(lobbys.indexOf(lobbyName) === -1) {
			lobbys.push(lobbyName);
		}

		const roomId = `lobby/${lobbyName}`;

		socket.join(roomId);

		io.to(roomId).emit('lobby:change', io.sockets.adapter.rooms[roomId].sockets);
	});
})

http.listen(3000, () => {
  console.log('listening on *:3000');
});
