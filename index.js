

//== Server Configuration ======================================================

//-- Dependencies --------------------------------
import express from 'express';
import WS from 'express-ws';
import { clientAdd } from './game/client_manager.js';
import { playerAdd } from './game/index.js';

//-- Constants -----------------------------------
const PORT = 7231;
const MESSAGE_SERVER_OPEN = `Server Opened on port ${PORT}`;
const PATH_CLIENT = 'client';
const URL_WEBSOCKET_MOUNT = '/';

//-- Create and Open Server ----------------------
let server = express();
WS(server);
server.listen(PORT, function () {
    console.log(MESSAGE_SERVER_OPEN);
});

//-- Serve Static Client Assets ------------------
server.use(express.static(PATH_CLIENT));

//-- Handle Websocket Traffic --------------------
server.ws(URL_WEBSOCKET_MOUNT, function (socket, request) {
    const clientNew = clientAdd(socket, request);
    playerAdd(clientNew);
});
