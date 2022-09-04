import path from 'path'
import { fileURLToPath } from 'url'
import FileUtil from '../utils/file.js'
import routes from "./cmdHandleRoute.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cmdHandleMap = new Map();
const cmdKeys = new Set(routes.keys())
const cmdHandleFilePaths = FileUtil.readFilePathList(path.join(__dirname, 'cmdHandle'));
// 动态加载所有cmdHandle 
cmdHandleFilePaths.forEach(async f => {
    const cmdHandles = await import(`file://${f}`)
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
                        return await cmdHandle(cmdKey, messageSplit)
                    }
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