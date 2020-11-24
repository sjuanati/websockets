const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const moment = require('moment');

// Start http & websocket servers
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
    httpServer: server
});

// To manage all active connections
const users = new Map();
let connection: any;

wsServer.on('request', (request: any) => {
    console.log(`${moment().format()} Connection established from ${request.origin}`);
    connection = request.accept(null, request.origin); // TODO: only accept allowed origin
    let id: string = '';

    // User sent a message
    connection.on('message', function (msg: any) {
        try {
            if (msg.type === 'utf8') {

                // Show incoming message
                const { publicId, action, message } = JSON.parse(msg.utf8Data);
                id = publicId;
                console.log(`Message received`);

                // Store connection
                if (action === 'ping') {
                    users.set(publicId, connection);
                };

                // Send data only to user
                if (action === 'send to me') {
                    (users.get(publicId))
                        ? users.get(publicId).sendUTF(JSON.stringify({
                            output: message,
                        }))
                        : null;
                };

                // Send data to all users
                if (action === 'send to all') {
                    let i = 0;
                    for (let conn of users.values()) {
                        conn.sendUTF(JSON.stringify({
                            outout: `Global comm ${i}`,
                        }));
                        i++;
                    };
                };
            };

        } catch (err) {
            console.log('Error in wsServer->onMessage: ', err);
        };
    });

    // user disconnected
    connection.on('close', () => {
        try {
            users.delete(id);
            console.log('Peer disconnected');
        } catch (err) {
            console.log('Error in wsServer->onClose: ', err);
        };

    });
});



