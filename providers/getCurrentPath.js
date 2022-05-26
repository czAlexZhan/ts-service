/**
 * get the generated file path
 * @param {string} pwd 
 * @param {string} dir 
 * @param {object} config 
 */
const path = require('path');
const fs = require('fs');

const getCurrentPath = (pwd, dir, config = {}) => {
    const alias = config ? (config.alias || {}) : {};

    if (alias[dir]) {
        const aliasPath = path.join(pwd, alias[dir]);
        
        if (fs.existsSync(aliasPath)) {
            return aliasPath;
        }

        return '';
    }
    
    const absolutePath = path.join(pwd, dir);
    if (fs.existsSync(absolutePath)) {
        return absolutePath;
    }

    return '';
}

module.exports = getCurrentPath;