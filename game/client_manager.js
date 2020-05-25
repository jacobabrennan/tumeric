

//==============================================================================

//-- Constants -----------------------------------
const EVENT_MESSAGE = 'message';
const EVENT_DISCONNECT = 'close';
const ACTION_KEY_DOWN = 'keyDown';
const ACTION_KEY_UP = 'keyUp';

//------------------------------------------------
const clientsActive = {};
export function clientAdd(socket, request) {
    const clientNew = new Client(socket, request);
    clientsActive[clientNew.id] = clientNew;
}
export function clientRemove(clientOld) {
    delete clientsActive[clientOld.id];
}

//------------------------------------------------
class Client {
    constructor(socket, request) {
        //
        this.commandState = {};
        //
        const randomInt = Math.floor(Math.random()*10000);
        this.id = `Guest_${randomInt}`
        //
        this.socket = socket;
        socket.on(EVENT_DISCONNECT, (eventClose) => {
            clientRemove(this);
        })
        socket.on(EVENT_MESSAGE, (eventMessage) => {
            eventMessage = JSON.parse(eventMessage);
            if(eventMessage.action) {
                this.dataReceive(eventMessage.action, eventMessage.data);
            }
        });
    }
    dataSend(action, data) {
        const message = {
            action: action,
            data: data,
        };
        this.socket.send(JSON.stringify(message));
    }
    dataReceive(action, data) {
        switch(action) {
            case ACTION_KEY_DOWN:
                this.keyDown(data);
                break;
            case ACTION_KEY_UP:
                this.keyUp(data);
                break;
        }
    }
    
    //-- Keyboard state change handlers --------------
    checkCommand(command) {
        return !!(this.commandState[command]); // boolean cast
    }
    keyDown(command) {
        this.commandState[command] = true;
    }
    keyUp(command) {
        delete this.commandState[command];
    }
}
