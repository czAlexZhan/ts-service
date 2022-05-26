#!/usr/bin/env node

const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const majorVersionGreaterThan12 = require('../providers/isV12');
const resolveArguments = require('../providers/resolveArgs');
const getCurrentPath = require('../providers/getCurrentPath');
const args = resolveArguments(process.argv.slice(2));
const cwd =  process.cwd() || __dirname;
const getConfig = require('../providers/getConfig');
const isDirectory = require('../providers/isDirectory');
const safelyMkdir = require('../providers/mkdir');
const writeIgnore = require('../providers/writeIgnore');
// config file
let config = null;

if (!majorVersionGreaterThan12) {
  console.log('node version must be >= 12.x and process exit');
  process.exit(0);
}

// check require
if (!args['--public']) {
  throw new Error('--public is required and process exit');
}
const publicPath = args['--public'];
// check config
if(args['--config']) {
  config = getConfig(cwd, args['--config']);
  if (!config) {
    throw new Error('get the configuration file error: file path does not exist or not a file');
  }
}

// get current path
let currentPath = args['--public'];
if (args['--dir']) {
  const _path = getCurrentPath(path.join(cwd, publicPath), args['--dir'], config);
  if (!_path) {
    throw new Error('get the generated file path error: file path does not exist');
  }

  if (!isDirectory(_path)) {
    throw new Error('the path is not a directory');
  }

  currentPath = _path;
}

// Configuration file exists
if (!fs.existsSync(`${currentPath}/autosConfig.json`)) {
  throw new Error('configuration file does not exist');
}

// write .ignore
writeIgnore(cwd);

// Create a temporary directory
const parentDir = args['--parentDir'];
let _tempDirPath = './temp/' + (args['--dir'] ? currentPath.replace(path.join(cwd, parentDir || 'src/routers/'), '') : currentPath.replace(parentDir || 'src/routers/', ''));

safelyMkdir(_tempDirPath);

// Create a types directory
safelyMkdir(`${currentPath}/types`);

/* all env paths
 * @type {string}
 */
const servicePath = `${_tempDirPath}/services`;
const configPath = `${_tempDirPath}/config.json`;
const swaggerPath = `${_tempDirPath}/swagger.json`;

// 1.1 Clear the last generation file
shell.rm('-rf', servicePath);
shell.rm('-f', `${swaggerPath}`);
shell.rm('-f', `${configPath}`);

// 1.2 Copy configuration file
shell.cp(`${currentPath}/autosConfig.json`, `${configPath}`);

// 2. write configuration
const absoluteSwaggerConfigPath = path.join(cwd, configPath);
const swaggerConfig = require(absoluteSwaggerConfigPath);
swaggerConfig.url = `${swaggerPath}`;
swaggerConfig.swaggerParser["-o"] = `${servicePath}`;
fs.writeFileSync(path.join(cwd, configPath), JSON.stringify(swaggerConfig));

// 3. generate
const normal = shell.exec(`npx autos -c ${configPath} --quiet`).code === 0;
if (!normal) {
  throw new Error('execute npx autos error');
}

// 3.1 delete
let oldFiles = fs.readdirSync(`${currentPath}/types/`);
oldFiles = oldFiles.filter(fileName => fileName.includes('.ts'));
const newFiles = fs.readdirSync(`${servicePath}/model/`);

oldFiles.forEach(filename => {
  if (!newFiles.includes(filename)) {
    fs.unlinkSync(`${currentPath}/types/${filename}`);
  }
});

// 3.2 copy
shell.cp('-Rf', `${servicePath}/model/*`, `${currentPath}/types/`);
