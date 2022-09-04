import WebSocket from 'ws';
import eventHandle from './handle/eventHandle.js'
import sequelize from './repository/sequelize'

sequelize.sync()

const ws = new WebSocket('ws://127.0.0.1:3000');

ws.on('message', async (data) => {
    const dataJson = JSON.parse(data.toString());
    eventHandle(dataJson);
});