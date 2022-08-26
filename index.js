import WebSocket from 'ws';

const ws = new WebSocket('ws://127.0.0.1:3000');

ws.on('message', function message(data) {
    console.log(JSON.parse(data.toString()));
});