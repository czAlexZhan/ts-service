/**
 * get config file
 * @param {string} pwd 
 * @param {string} filePath 
 */
const path = require('path');
const fs = require('fs');
const isFile = require('./isFile');

const getConfig = (pwd, filePath) => {
    let config = null;
    const absoluteFilePath = path.join(pwd, filePath);

    if (fs.existsSync(absoluteFilePath)) {

        if (isFile(absoluteFilePath)) {
            config = require(absoluteFilePath);
        }
    }

    return config;
};

module.exports = getConfig;