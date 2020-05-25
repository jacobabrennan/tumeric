

//== Server Configuration ======================================================

//-- Dependencies --------------------------------
import express from 'express';
import WS from 'express-ws';

//-- Constants -----------------------------------
const PORT = 7231;
const MESSAGE_SERVER_OPEN = `Server Opened on port ${PORT}`;
const PATH_CLIENT = 'client';

//-- Create and Open Server ----------------------
let server = express();
WS(server);
server.listen(PORT, function () {
    console.log(MESSAGE_SERVER_OPEN);
});

//-- Serve Static Client Assets ------------------
server.use(express.static(PATH_CLIENT));

//-- Handle Websocket Traffic --------------------
server.ws('/', function (ws, req) {
    console.log(' -- WebSocket: New Connection');
    // close, error, message, ping, pong, unexpected-response, upgrade 
    ws.on('pong', function (thing) {
        console.log('asdf')
    });
});