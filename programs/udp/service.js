module.exports = ({port = 8125, host = '127.0.0.1'} = {}) => {
    const dgram = require('dgram'); // Using https://nodejs.org/api/dgram.html
    const server = dgram.createSocket('udp4');

    server.on('listening', () => {
        const address = server.address();
        console.log(`UDP Server listening on ${address.address}:${address.port}`);
    });

    server.on('message', (message, remote) => console.log(`${remote.address}:${remote.port} - ${message}`));

    server.bind(port, host);
};
