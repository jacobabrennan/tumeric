

//==============================================================================

//-- Dependencies --------------------------------
import gameplay from "../view/gameplay/index.js";
import { ACTION_AUDIO_BUFFER } from "../view/gameplay/network.js";

//-- Constants -----------------------------------
const ADDRESS_CONNECTION = 'ws://localhost:7231';
// should be defined centrally
const ACTION_UPDATE = 'update';
const EVENT_MESSAGE = 'message';

//------------------------------------------------
export default {
    async configure(configuration) {
        this.socket = new WebSocket(ADDRESS_CONNECTION);
        this.socket.addEventListener(EVENT_MESSAGE, (eventMessage) => {
            this.receive(eventMessage.data);
        });
    },
    send(message) {
        this.socket.send(JSON.stringify(message));
    },
    receive(message) {
        message = JSON.parse(message);
        switch(message.action) {
            case ACTION_UPDATE:
                gameplay.update(message.data);
                break;
            case ACTION_AUDIO_BUFFER:
                gameplay.audioUpdate(message.data)
                break;
        }
    }
}
