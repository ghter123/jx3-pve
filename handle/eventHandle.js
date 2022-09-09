import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import { fileURLToPath } from 'url'
import FileUtil from '../utils/file.js'
import routes from "./cmdHandleRoute.js"
import autoApply from "../service/autoApply.js"

let config = {}
try {
    config = yaml.load(fs.readFileSync('./go-cqhttp/config.yml', 'utf8'))
} catch (e) {
    console.log(e);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cmdHandleMap = new Map();
const cmdKeys = new Set(routes.keys())
const cmdHandleFilePaths = FileUtil.readFilePathList(path.join(__dirname, 'cmdHandle'));
// 动态加载所有cmdHandle 
cmdHandleFilePaths.forEach(async f => {
    const cmdHandles = (await import(`file://${f}`)).default
    if (typeof cmdHandles !== 'object') return;
    for (const cmdHandle in cmdHandles) {
        if (typeof cmdHandles[cmdHandle] !== 'function') continue;
        cmdHandleMap.set(cmdHandle, cmdHandles[cmdHandle]);
    }
    console.log(`load handle: ${FileUtil.getFileName(f)}`);
});

/**
 * 
 * @param {Event} data 
 */
export default async function (data) {
    switch (data.post_type) {
        case "message": {
            if (data.message_type === 'group') {
                if (data.message && typeof data.message === 'string') {
                    const messageSplit = data.message.split(' ')
                    const cmdKey = messageSplit[0]
                    if (cmdKeys.has(cmdKey)) {
                        messageSplit.splice(0, 1)
                        console.log(cmdKey)
                        console.log(messageSplit.join(' '))
                        const message = await cmdHandle(cmdKey, messageSplit)
                        return {
                            message,
                            groupId: message?.groupId || data.group_id
                        }
                    } else {
                        if (data.message.startsWith('[CQ:at,qq=')) {
                            const beginIndex = data.message.indexOf('=')
                            const endIndex = data.message.indexOf(']')
                            const targetQQ = data.message.slice(beginIndex + 1, endIndex)
                            if (targetQQ != config.account.uin) return
                            const content = await autoApply(data.message.slice(data.message.indexOf(' ') + 1))
                            if (!content) return
                            return {
                                message: content,
                                groupId: data.group_id
                            }
                        }
                    }
                }
            } else if (data.message_type === 'private') {
                console.log(data)
                const content = await autoApply(data.message)
                if (!content) return
                return {
                    message: content,
                    userId: data.user_id
                }
            }
        }
        default:
    }
}

async function cmdHandle(cmdAlias, args) {
    const cmd = routes.get(cmdAlias) ?? cmdAlias;
    if (!cmdHandleMap.has(cmd)) {
        return;
    }
    const handle = cmdHandleMap.get(cmd);
    if (!typeof handle === 'function') {
        console.log(`指令: ${cmd} 没有找到正确的执行器`);
        return;
    }
    let rst = handle(...args);
    if (rst instanceof Promise) {
        rst = await rst;
    }
    return rst;
}