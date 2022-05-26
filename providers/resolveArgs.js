/**
 * analysis arguments
 */

const resolver = (arguments = []) => {
    const args = {};
    let prevKey = '';
    if (arguments.length === 0) {
        return args;
    }

    arguments.forEach((str, index) => {
        if (index%2 === 0) {
            prevKey = str;
            args[prevKey] = '';
        } else {
            args[prevKey] = str;
        }
    });

    return args;

};

module.exports = resolver;