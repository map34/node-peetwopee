import * as net from 'net';

const PORT = 9000;

const sleep = async (timeMs: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeMs);
    });
};

const sockets = {};

const server = net.createServer((socket) => {
    console.log(`New socket is connected: ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on('end', () => {
        console.log('Socket is disconnected');
    });

    socket.on('data', async (data) => {
        socket.read(4);
        await sleep(2000);
        console.log(`[${(new Date()).toUTCString()}] - [${socket.remoteAddress}:${socket.remotePort}]: ${data.toString()}`);
        if (!socket.destroyed)
            socket.write('Hello from server');
    });

    socket.on('error', (error) => {
        console.error('Error from server', error);
    });
});

server.listen(PORT, () => {
    console.log(`Server is listening on: ${PORT}`);
});