/**
 * judge version
 */

const nodeVersion = process.version;
const majorNumber = nodeVersion.split('.')[0].replace('v', '');

module.exports = parseInt(majorNumber) >= 12;

