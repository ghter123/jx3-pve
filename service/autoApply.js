import axios from "axios"

export default async (msg) => {
    if (!msg) return
    const res = await axios.get(`http://api.qingyunke.com/api.php?key=free&appid=0&msg=${encodeURIComponent(msg)}`)
    if (!res.status === 200 || res.data.result !== 0) return
    return res.data.content
}