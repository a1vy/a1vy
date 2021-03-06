const inquirer = require('inquirer');

module.exports = async () => {
    inquirer
        .prompt([
            {
                name: 'host',
                message: 'Hostname or IP',
                type: 'input',
                default: '127.0.0.1',
            },
            {
                name: 'port',
                message: 'Port number',
                type: 'input',
                default: '8125',
            },
            {
                name: 'encoding',
                message: 'Message encoding ()',
                type: 'list',
                default: 'utf8',
                choices: [
                    {name: 'utf8'},
                    {name: 'ascii'},
                    {name: 'binary'},
                    {name: 'latin1'},
                    {name: 'ucs2 (alias of utf16le)', value: 'ucs2'},
                    {name: 'utf16le'},
                    {name: 'hex'},
                    {name: 'base64'},
                ],
            },
        ])
        .then(answers => require('./service')(answers))
        .catch(error => {
            throw error;
        });
};
