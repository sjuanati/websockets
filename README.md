# Websockets test

Goal is to test interaction between a client and server using [websocket](https://www.npmjs.com/package/websocket/).

## Installation & running

This application requires [Node.js](https://nodejs.org/) to run. After cloning the project, install all dependencies:

* Back-end:

```sh
$ cd back-end\
$ npm i
$ nodemon
```

* Front-end:
```sh
$ cd front-end\
$ npm i
$ npm start
```

## Instructions (example)

* Test:

1) Run the server
2) Run the client
2.1) Send ID (e.g.: 1)
2.2) Send data to ME
3) Run another client (e.g.: opening a different web browser)
3.1) Send ID (e.g.: 2)
3.2) Send data to ME
4) Send data to all

* Output: (see console.logs)

- Message in 2.2) is only sent to client 1
- Message in 3.2) is only sent to client 2
- Message in 4) is sent to all clients
