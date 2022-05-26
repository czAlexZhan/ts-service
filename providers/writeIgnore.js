const fs = require('fs');

const writeIgnore = (pwd) => {
    const gitIgnoreStr = fs.readFileSync(`${pwd}/.gitignore`, {encoding: 'utf-8'});
    if (!gitIgnoreStr || !gitIgnoreStr.includes('/temp/')){
        fs.appendFileSync(`${pwd}/.gitignore`, '\n/temp/', 'utf-8');
    }
    
    const eslintStr = fs.readFileSync(`${pwd}/.eslintignore`, {encoding: 'utf-8'});
    if (!eslintStr || !eslintStr.includes('/temp/*')) {
        fs.appendFileSync(`${pwd}/.eslintignore`, '\n/temp/*', 'utf-8');
    }

    const prettierStr = fs.readFileSync(`${pwd}/.prettierignore`, {encoding: 'utf-8'});
    if (!prettierStr || !prettierStr.includes('/src/routers/**/types/*')) {
        fs.appendFileSync(`${pwd}/.prettierignore`, '\n/src/routers/**/types/*', 'utf-8');
    }
};

module.exports = writeIgnore;