import * as net from 'net';
// Create a socket (client) that connects to the server
const socket = new net.Socket();
socket.on('data', function (data) {
    console.log(data.toString());
    socket.write(`Hello from client: ${socket.remoteAddress} on ${socket.remotePort}`);
});

socket.on('end', () => {
    console.error('Client is disconnected');
});

socket.on('error', (error) => {
    console.error('Error from client', error);
});

socket.connect({
    port: 9000,
    host: '192.168.0.15'
}, () => {
    console.log("Client: Connected to server");
    socket.write('Initial message from client');
});

// Let's handle the data we get from the server
