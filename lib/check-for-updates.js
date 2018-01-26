const { fork } = require('child_process');
const semver = require('semver');
const boxt = require('boxt');
require('colors');

module.exports = async function init(current) {
    if (!current) {
        return;
    }

    const forked = fork(`${__dirname}/latest-version`, {stdio: 'ignore'});

    forked.on('message', async(latest) => {
        const upgrade = semver.gt(latest.version, current.version);

        if (!upgrade) {
            return;
        }

        const fullName = `${current.name}@${latest.version}`;
        const command = `npm i -g ${fullName}`;
        const lines = [
            `Update available ${current.version} → ${latest.version}`,
            `Run ${command} to update`,
        ];
        const message = boxt(lines.join('\n'))
            .replace(current.version, current.version.gray)
            .replace(latest.version, latest.version.green)
            .replace(lines[1], lines[1].green)
            .replace(command, command.bold.underline);

        process.stdin.resume();
        process.on('SIGINT', () => {
            console.log(message);
            process.exit();
        });
    });

    forked.send({});
}
