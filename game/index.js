

//==============================================================================

//-- Dependencies --------------------------------
import { roomAdd, roomGetAll } from './map/map.js';
import { clientGetAll } from './client_manager.js';

//-- Constants -----------------------------------
export const ROOM_ID_TEST = 'lobby';
const GAME_ITERATION_DELAY = 1000/30;

//-- Internal State ------------------------------
roomAdd(ROOM_ID_TEST);
let gameActive = false;

//-- Main Game Loop ------------------------------
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
function gameLoopIterate() {
    // Direct all rooms to iterate, directing contained particles to take their turns
    let rooms = roomGetAll(); // Hash: roomId maps to room object
    for(const roomId in rooms) {
        const room = rooms[roomId];
        room.iterate();
    }
    // Compile game state from all rooms (and included particles)
    rooms = roomGetAll(); // particle actions may create new rooms
    const updates = {};
    for(const roomId in rooms) {
        const room = rooms[roomId];
        updates[roomId] = room.package();
    };
    // Send relevant room data to each connected client
    const clients = clientGetAll();
    for(const clientId in clients) {
        const client = clients[clientId];
        // Skip clients without players (not yet logged in)
        if(!client.player) { continue;}
        // Skip players not in rooms (null or incorrect room id)
        const roomData = updates[client.player.roomId];
        if(!roomData) { continue;}
        // Udate client with room data
        client.update(roomData);
    };
    // Continue main game loop after a delay
    setTimeout(gameLoopIterate, GAME_ITERATION_DELAY);
}
