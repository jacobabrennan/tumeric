

//== Player Management =========================================================

//-- Dependencies --------------------------------
import gameStart from './index.js';
import { Particle } from './map/particle.js';

//-- Constants -----------------------------------
// These should be defined elsewhere
const NORTH = 1;
const SOUTH = 2;
const EAST = 4;
const WEST = 8;

//-- Player Management ---------------------------
export function playerAdd(client) {
    let player = new Player();
    player.clientAttach(client);
    player.place(ROOM_ID_TEST, 0, 0);
    gameStart();
    return player;
}
export function playerRemove(player) {
    player.clientDetach();
}

//-- Player --------------------------------------
class Player extends Particle {
    clientAttach(clientNew) {
        this.client = clientNew;
        clientNew.player = this;
    }
    clientDetach() {
        if(!this.client) { return;}
        this.client = null;
        this.client.player = null;
    }
    takeTurn() {
        // Check for commands from client, and translate to requested movement
        let deltaX = 0;
        let deltaY = 0;
        if(this.client.commandCheck(NORTH)) { deltaY++;};
        if(this.client.commandCheck(SOUTH)) { deltaY--;};
        if(this.client.commandCheck(EAST)) { deltaX++;};
        if(this.client.commandCheck(WEST)) { deltaX--;};
        // If no movement was requested, stop
        if(!(deltaX || deltaY)) { return;}
        // Attempt to move the player as per client commands
        this.translate(deltaX, deltaY);
    }
}
