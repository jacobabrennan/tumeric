

//==============================================================================

//-- Constants -----------------------------------
const ADDRESS_CONNECTION = 'ws://localhost:7231';

//------------------------------------------------
export default {
    async configure(configuration) {
        this.socket = new WebSocket(ADDRESS_CONNECTION);
        console.log(this.socket);
    }
}
