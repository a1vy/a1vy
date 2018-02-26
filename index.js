#!/usr/bin/env node

require('colors');
const { readdir } = require('fs');
const { promisify } = require('util');
const ls = promisify(readdir);
const inquirer = require('inquirer');
const boxt = require('boxt');
const { name, version } = require('./package.json');
const { clear } = require('./lib/terminal');

clear();

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    console.error(reason);
});

try {
    init();
} catch (error) {
    throw error;
}

async function init() {

    const greeting = await require('./lib/greet')();


    console.log(
    `
         ${greeting.bold}
        ─────┬─${'─'.repeat(Math.max(greeting.length - 5, 1))}
    ╭──────╮ ╯
    │ ◜   ◝│
    │  ☉ ☉ │
    ├┬┬┬┬┬┬┤
    ├┴┴┴┴┴┴┤
    ╰─╮  ╭─╯
    ╭─╯  ╰─╮  ${`${name} ${version}`.underline.yellow}

    `
    );

    const programs = await ls(`${__dirname}/programs`);

    const choices = programs.map((value, index) => {
        const {
            name,
            desc,
        } = require(`./programs/${value}/details.json`);

        return {
            name: `${name.bold} - ${desc}`,
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

require('upgradable')(require('./package.json'));
