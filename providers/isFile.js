const fs = require('fs');

const isFileByPath = (path) => {
    const stat = fs.statSync(path);
    return stat.isFile();
}

module.exports = isFileByPath;