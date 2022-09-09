import WebSocket from 'ws';
import eventHandle from './handle/eventHandle.js'

const ws = new WebSocket('ws://127.0.0.1:3000');

ws.on('message', async (data) => {
    const dataJson = JSON.parse(data.toString());
    const res = await eventHandle(dataJson);
    if (res) {
        console.log(`repley: ${JSON.stringify(res)}`)
        if (res.groupId) {
            ws.send(JSON.stringify({
                "action": "send_group_msg",
                "params": {
                    "group_id": res.groupId,
                    "message": typeof res.message === 'string' ? res.message : JSON.stringify(res.message)
                },
            }))
        } else if (res.userId) {
            ws.send(JSON.stringify({
                "action": "send_private_msg",
                "params": {
                    "user_id": res.userId,
                    "message": typeof res.message === 'string' ? res.message : JSON.stringify(res.message)
                }
            }))
        }
    }
});