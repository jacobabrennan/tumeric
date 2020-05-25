

//==============================================================================

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
    }
}
