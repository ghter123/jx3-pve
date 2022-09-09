import axios from "axios"

export default async (msg) => {
    if (!msg) return
    const res = await axios.get(`http://api.qingyunke.com/api.php?key=free&appid=0&msg=${encodeURIComponent(msg)}`)
    if (!res.status === 200 || res.data.result !== 0) return
    if(res.data.content === '无法理解您的话，获取帮助请发送 help') return '看不懂'
    return res.data.content.replace(/菲菲/g,"嗷嗷")
}