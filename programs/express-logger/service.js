require('colors');
const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');

module.exports = async ({host, port} = {}) => {
    const app = express();

    app.use(cors({preflightContinue: true}));
    app.use(json());
    app.use('*', (request, response) => {
        const data = {
            Headers: request.headers,
            Body: request.body,
        };

        console.log(
            Object.entries(data).map(
                ([key, value]) => `> ${key.bold}\n${printable(value)}`
            ).join('\n\n')
        );

        response.status(201).end();
    })


    app.listen(parseInt(port, 10), host, () => {
        console.log(`Static file server running:\nhttp://${host}:${port}\nCTRL + C to shutdown`);
    });
};

const printable = (data) => require('../../lib/pretty-json')(JSON.stringify(data));
