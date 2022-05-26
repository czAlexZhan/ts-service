const fs = require('fs');

const safelyMkdir = (dirname) => {
    if (fs.existsSync(dirname)) {
        return true;
    }
    
    return fs.mkdirSync(dirname, {recursive: true});
}

module.exports = safelyMkdir;