

//== Client Management =========================================================

//-- Dependencies --------------------------------
import { playerAdd } from './player_manager.js';

//-- Constants -----------------------------------
const EVENT_MESSAGE = 'message';
const EVENT_DISCONNECT = 'close';
const ACTION_LOG_IN = 'logIn';
const ACTION_KEY_DOWN = 'keyDown';
const ACTION_KEY_UP = 'keyUp';
const ACTION_UPDATE = 'update';
const ACTION_AUDIO_BUFFER = 'audioBuffer';

//-- Client Management ---------------------------
const clientsActive = {};
export function clientGetAll() {
    return Object.assign({}, clientsActive);
}
export function clientAdd(socket, request) {
    const clientNew = new Client(socket, request);
    clientsActive[clientNew.id] = clientNew;
    return clientNew;
}
export function clientRemove(clientOld) {
    delete clientsActive[clientOld.id];
}


//== Client ====================================================================

class Client {

    //-- Constructor ---------------------------------
    constructor(socket, request) {
        // Initialize object properties
        this.commandState = {};
        // Give each client a random id
            // This can be changed later when the client logs in
            // (login not yet implemented)
        const randomInt = Math.floor(Math.random()*10000);
        this.id = `Guest_${randomInt}`
        // Configure network connection
        this.dataSetup(socket);
    }
    
    //-- Networking ----------------------------------
    dataSetup(socket) {
        this.socket = socket;
        socket.on(EVENT_DISCONNECT, (eventClose) => {
            clientRemove(this);
        });
        socket.on(EVENT_MESSAGE, (eventMessage) => {
            eventMessage = JSON.parse(eventMessage);
            if(eventMessage.action) {
                this.dataReceive(eventMessage.action, eventMessage.data);
            }
        });
    }
    dataSend(action, data) {
        // Send action and associated data to remote client as a string
        const message = {
            action: action,
            data: data,
        };
        this.socket.send(JSON.stringify(message));
    }
    dataReceive(action, data) {
        // Execute commands received from remote client
        switch(action) {
            case ACTION_LOG_IN:
                this.logIn(data);
                break;
            case ACTION_KEY_DOWN:
                this.keyDown(data);
                break;
            case ACTION_KEY_UP:
                this.keyUp(data);
                break;
            case ACTION_AUDIO_BUFFER:
                this.dataSend(ACTION_AUDIO_BUFFER, data);
                break;
        }
    }
    
    //-- Player Connection Handling ------------------
    logIn(data) {
        playerAdd(data, this);
    }
    
    //-- Keyboard state change handlers --------------
    commandCheck(command) {
        // Return keystate associated with specified command
        return !!(this.commandState[command]); // boolean cast
    }
    keyDown(command) {
        // Set keystate associated with specified command
        this.commandState[command] = true;
    }
    keyUp(command) {
        // Clear keystate associated with specified command
        delete this.commandState[command];
    }

    //-- Game State Handling -------------------------
    update(roomData) {
        this.dataSend(ACTION_UPDATE, roomData);
    }
}
