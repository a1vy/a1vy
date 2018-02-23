require('colors');
const boxt = require('boxt');
const { promisify } = require('util');
const { readdir, readFile, writeFile } = require('fs');

const ls = promisify(readdir);
const read = promisify(readFile);
const write = promisify(writeFile);

const inquirer = require('inquirer');

const fixFilename = file => file.replace(/^__/, '.');
const sorter = (a, b) => {
    a = fixFilename(a).toLowerCase();
    b = fixFilename(b).toLowerCase();

    return a < b ? -1 : b < a ? 1 : 0;
};

module.exports = async () => {

    const files = await ls(`${__dirname}/files`);

    const choices = files.sort(sorter).map(item => ({
        name: fixFilename(item),
        value: item,
        checked: false,
    })
    );

    const answers = await inquirer
        .prompt([
            {
                name: 'files',
                message: 'Which files would you like me to write for you?',
                type: 'checkbox',
                choices,
            },
        ]);

    const promises = answers.files.map(file => {
        return read(`${__dirname}/files/${file}`)
            .then(data => write(`./${fixFilename(file)}`, data))
            .then(() => fixFilename(file))
            .catch(error => {
                throw error;
            });
        });

    Promise.all(promises)
        .then((results) => {
            console.log(boxt([
                'Files have been written:'.blue.bold,
                results.join(', ').yellow,
            ].join('\n'), {align: 'start'}));

            process.exit();
        }).catch(error => {
            throw error;
        });

};
