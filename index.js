#!/usr/bin/env node

require('colors');
const { readdir } = require('fs');
const { promisify } = require('util');
const ls = promisify(readdir);
const inquirer = require('inquirer');
const boxt = require('boxt');
const { name, version } = require('./package.json');

console.log(
    boxt(
`🤖  ${'Welcome, human'.bold}.
You are running ${name.yellow} version ${version.yellow}`,
        {color: 'gray', theme: 'round', align: 'left'}
    )
);

try {
    init();
} catch (error) {
    throw error;
}

async function init() {
    const programs = await ls(`${__dirname}/programs`);

    const choices = programs.map((value, index) => {
        const {
            name
        } = require(`./programs/${value}/details.json`);

        return {
            name,
            value,
        };
    }).sort(caseInsensitiveSortByName);

    try {
        const answers = await inquirer
            .prompt([
                {
                    name: 'service',
                    message: 'Select Service',
                    type: 'list',
                    choices,
                },
            ]);

        await require(`./programs/${answers.service}`)();
    } catch (error) {
        throw error;
    }
}

function caseInsensitiveSortByName(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
         return -1;
    }

    if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
    }

    return 0;
}

require('./lib/check-for-updates')(require('./package.json'));
