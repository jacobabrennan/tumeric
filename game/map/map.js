

//==============================================================================

//-- Dependencies --------------------------------
import Room from './room.js';

//-- Internal State ------------------------------
const rooms = {};

//------------------------------------------------
export function roomGetAll() {
    return rooms.slice();
}
export function roomGetById(roomId) {
    return rooms[roomId];
}
export function roomAdd(roomId) {
    if(roomId in rooms) {
        throw "Duplicate room id";
    }
    rooms[roomId] = new Room(roomId);
}
export function roomRemove(roomId) {
    delete rooms[roomId];
}
