

//==============================================================================

//-- Dependencies --------------------------------
import { Room, rooms, Particle } from './map.js';

//-- Constants -----------------------------------
const GAME_ITERATION_DELAY = 1000/30;
const NORTH = 1;
const SOUTH = 2;
const EAST = 4;
const WEST = 8;

//------------------------------------------------
let lobby  = new Room();
let gameActive = false;
function gameStart() {
    if(gameActive) { return;}
    gameActive = true;
    try {
        gameLoopIterate();
    }
    catch(error) {
        console.log(error)
    }
}
export function gameLoopIterate() {
    for(const roomId in rooms) {
        const room = rooms[roomId];
        room.iterate();
    }
    setTimeout(gameLoopIterate, GAME_ITERATION_DELAY);
}
export function playerAdd(client) {
    let player = new Player();
    player.clientAttach(client);
    player.place(lobby.id, 0, 0);
    gameStart();
    return player;
}

//------------------------------------------------
class Player extends Particle {
    clientAttach(clientNew) {
        this.client = clientNew;
    }
    takeTurn() {
        let deltaX = 0;
        let deltaY = 0;
        if(this.client.commandCheck(NORTH)) { deltaY++;};
        if(this.client.commandCheck(SOUTH)) { deltaY--;};
        if(this.client.commandCheck(EAST)) { deltaX++;};
        if(this.client.commandCheck(WEST)) { deltaX--;};
        if(!(deltaX || deltaY)) { return;}
        this.translate(deltaX, deltaY);
    }
}
