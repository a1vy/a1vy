const inquirer = require('inquirer');

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
    ])
    .then(answers => require('./service')(answers))
    .catch(error => {
        throw error;
    });
