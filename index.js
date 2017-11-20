#!/usr/bin/env node

const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            name: 'service',
            message: 'Select Service',
            type: 'list',
            choices: [
                {
                    name: 'Simple UDP server listener',
                    value: 'udp',
                }
            ],
        },
    ])
    .then(answers => require(`./programs/${answers.service}`))
    .catch(error => {
        throw error;
    });
