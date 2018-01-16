module.exports = ({port = 8125, host = '127.0.0.1'} = {}) => {
    const dgram = require('dgram'); // Using https://nodejs.org/api/dgram.html
    const server = dgram.createSocket('udp4');

    server.on('listening', () => {
        const { address, port } = server.address();

        console.log(`UDP Server listening on ${address}:${port}\nCTRL + C to shutdown`);
    });

    server.on('message', (message, remote) => {
        const { address, port } = remote;

        console.log(`${address}:${port} - ${message}`)
    });

    server.bind(port, host);
};
