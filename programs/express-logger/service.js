require('colors');
const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');

module.exports = async ({host, port} = {}) => {
    const app = express();

    app.use(cors());
    app.use(json());
    app.use('*', (request, response) => {
        console.log(
            '> Headers'.bold,
            '\n',
            request.headers,
            '\n\n',
            '> Body'.bold,
            '\n',
            require('../../lib/pretty-json')(JSON.stringify(request.body))
        );

        response.status(201).end();
    })


    app.listen(parseInt(port, 10), host, () => {
        console.log(`Static file server running:\nhttp://${host}:${port}\nCTRL + C to shutdown`);
    });
};
