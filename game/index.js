

//==============================================================================

//-- Dependencies --------------------------------
import { roomAdd, roomGetAll } from './map/map.js';

//-- Constants -----------------------------------
const ROOM_ID_TEST = 'lobby';
const GAME_ITERATION_DELAY = 1000/30;

//-- Module State --------------------------------
roomAdd(ROOM_ID_TEST);
let gameActive = false;

//------------------------------------------------
export function gameStart() {
    // If the game is already active, stop
    if(gameActive) { return;}
    gameActive = true;
    // Start main game loop
    try {
        gameLoopIterate();
    }
    // Log errors to the console
    catch(error) {
        console.log(error);
    }
}

//------------------------------------------------
function gameLoopIterate() {
    // Direct all rooms to iterate, directing contained particles to take their turns
    const rooms = roomGetAll();
    for(const roomId in rooms) {
        const room = rooms[roomId];
        room.iterate();
    }
    // Continue main game loop after a delay
    setTimeout(gameLoopIterate, GAME_ITERATION_DELAY);
}
