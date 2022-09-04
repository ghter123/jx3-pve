import cmdHandleRoute from "./cmdHandle/cmdHandleRoute";
import FileUtil from '../../utils/file.js';
import routes from "./cmdHandle/cmdHandleRoute.js";

const cmdHandleMap = new Map();
const cmdKeys = new Set(routes.keys())
const cmdHandleFilePaths = FileUtil.readFilePathList('../');
// 动态加载所有cmdHandle 
cmdHandleFilePaths.forEach(f => {
    const cmdHandles = import(f);
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
                const messageSplit = data.message.spilt(' ')
                
                await cmdHandle(data.message);
            }
        }
        default:
    }
}

async function cmdHandle(routes, cmdAlias, args) {
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