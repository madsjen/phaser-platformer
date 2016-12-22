'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const lobbys = [];

io.on('connection', (socket) => {
	socket.on('disconnecting', () => {
		const roomId = Object.keys(socket.rooms)[1];

		if(io.sockets.adapter.rooms[roomId]) {
			delete io.sockets.adapter.rooms[roomId].sockets[socket.id]

			io.to(roomId).emit('lobby:change', io.sockets.adapter.rooms[roomId].sockets);
		}
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

		const player = socket.id;

		const allPlayers = io.sockets.adapter.rooms[roomId].sockets;

		socket.emit('lobby:change', { player, allPlayers });
		io.to(roomId).emit('lobby:change', { player: '', allPlayers });
	});

	socket.on('lobby:startGame', () => {
		const roomId = Object.keys(socket.rooms)[1];

		io.to(roomId).emit('lobby:startGame');
	});

	socket.on('player:move', (player, x, y) => {
		const roomId = Object.keys(socket.rooms)[1];

		io.to(roomId).emit('player:move', socket.id, x, y);
	});
})

http.listen(3000, () => {
  console.log('listening on *:3000');
});
