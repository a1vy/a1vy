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

    answers.files.forEach(file => {
        read(`${__dirname}/files/${file}`)
            .then(data => write(`./${file}`, data))
            .then(() => console.log(`${file} has beed written`))
            .catch(error => {
                throw error;
            });
    });

};
