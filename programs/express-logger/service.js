require('colors');
const express = require('express');

module.exports = async ({host, port} = {}) => {
    const app = express();

    app.get('/', (request, response) => {
        console.log(
            '> Headers'.bold,
            '\n',
            request.headers,
            '\n\n',
            '> Body'.bold,
            '\n',
            require('../../lib/pretty-json')(request.body)
        );

        response.status(203).end();
    })


    app.listen(parseInt(port, 10), host, () => {
        console.log(`Static file server running:\nhttp://${host}:${port}\nCTRL + C to shutdown`);
    });
};
