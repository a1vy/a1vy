async function getLatest() {
    const npm = await require('./npm');
    const {name} = require('../package.json');
    const {promisify} = require('util');
    const result = await promisify(npm.view)(`${name}@latest`);
    const latest = Object.values(result).shift();

    if (!latest) {
        throw new Error(`Could not find a latest tag in for package "${name}"`);
        return;
    }

    return latest.version;
}

process.on('message', async(/* message */) => {
    const version = await getLatest();

    process.send({ version });
});
