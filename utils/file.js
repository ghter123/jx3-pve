import fs from 'fs';
import path from 'path';

function readFilePathList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((item) => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            readFilePathList(path.join(dir, item), filesList);
        } else {
            filesList.push(fullPath);
        }
    });
    return filesList;
}

function getFileName(path) {
    return path.substring(path.lastIndexOf('\\'), path.lastIndexOf("."))
}

export default {
    readFilePathList,
    getFileName
}