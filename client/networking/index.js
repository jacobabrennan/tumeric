

//==============================================================================

//-- Dependencies --------------------------------
import gameplay from "../view/gameplay/index.js";

//-- Constants -----------------------------------
const ADDRESS_CONNECTION = 'ws://localhost:7231';

//------------------------------------------------
export default {
    async configure(configuration) {
        this.socket = new WebSocket(ADDRESS_CONNECTION);
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
        }
    }
}
