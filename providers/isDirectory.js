const fs = require('fs');

const isDirectoryByPath = (path) => {
    const stat = fs.statSync(path);
    return stat.isDirectory();
}

module.exports = isDirectoryByPath;