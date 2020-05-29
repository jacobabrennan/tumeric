

//== Player Management =========================================================

//-- Dependencies --------------------------------
import { gameStart, ROOM_ID_TEST } from './index.js';
import Particle from './map/particle.js';

//-- Constants -----------------------------------
// These should be defined elsewhere
const NORTH = 1;
const SOUTH = 2;
const EAST = 4;
const WEST = 8;

//-- Internal State ------------------------------
const players = {};

//-- Player Management ---------------------------
export function getPlayerAll() {
    return Object.assign({}, players);
}
export function getPlayer(playerId) {
    return players[playerId];
}
export function playerAdd(playerId, client) {
    let newPlayer = players[playerId];
    // if(newPlayer.client) {
    //     oh well
    // }
    if(!newPlayer) {
        newPlayer = new Player();
    }
    newPlayer.clientAttach(client);
    newPlayer.place(ROOM_ID_TEST, 0, 0);
    gameStart();
    return newPlayer;
}
export function playerRemove(playerId) {
    const player = getPlayer(playerId);
    player.clientDetach();
    delete players[playerId];
}

//-- Player --------------------------------------
class Player extends Particle {
    constructor() {
        super();
        // Potential for conflict with Particle.id; id already managed by the functions above
        // this.playerId = playerId;
        const colors = ['black', 'white', 'yellow', 'lightblue'];
        this.color = colors[Math.floor(Math.random() * colors.length)]
    }
    package() {
        const update = super.package();
        update.color = this.color;
        return update;
    }
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
