require('colors');
const boxt = require('boxt');
const { promisify } = require('util');
const { readdir, readFile, writeFile } = require('fs');

const ls = promisify(readdir);
const read = promisify(readFile);
const write = promisify(writeFile);

const inquirer = require('inquirer');

module.exports = async () => {

    const files = await ls(`${__dirname}/files`);

    const choices = files.map(item => ({
        name: item,
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
            .then(data => write(`./${file}`, data))
            .then(() => file)
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
