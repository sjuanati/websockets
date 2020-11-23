const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const moment = require('moment');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
    httpServer: server
});

// All active connections in this object
//const clients = {};
let connection;

wsServer.on('request', (request: any) => {
    console.log(`${moment().format()} Connection established from ${request.origin}`);
    // You can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin);

    // User sent a message
    connection.on('message', function (message: any) {
        console.log('Message received: ', message);
        connection.sendUTF(JSON.stringify('holas manolas'));
    });

    // user disconnected
    connection.on('close', (connection: any) =>  {
        console.log((new Date()) + " Peer disconnected.");
    });

});



