import FileUtil from '../../utils/file';

const cmdHandleMap = new Map();
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

export default async (cmd) => {
    if (!cmdHandleMap.has(cmd)) {
        console.log(`未知指令：${cmd}`);
        return;
    }
    const handle = cmdHandleMap.get(cmd);
    if (!typeof handle === 'function') {
        console.log(`指令: ${cmd} 没有找到正确的执行器`);
        return;
    }
    let rst = handle();
    if (rst instanceof Promise) {
        rst = await rst;
    }
    return rst;
}