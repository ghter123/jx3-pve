import WebSocket from 'ws';
import eventHandle from './handle/eventHandle.js'

const ws = new WebSocket('ws://127.0.0.1:3000');

ws.on('message', async (data) => {
    const dataJson = JSON.parse(data.toString());
    const res = await eventHandle(dataJson);
    if (res) {
        ws.send(JSON.stringify({
            "action": "send_group_msg",
            "params": {
                "group_id": res.groupId,
                "message": res.message
            },
        }))
    }
});