

//==============================================================================

//------------------------------------------------
const rooms = {};
function roomGetById(roomId) {
    return rooms[roomId];
}
function roomAdd(roomNew) {
    if(roomNew.id in rooms) {
        throw "Duplicate room id";
    }
    rooms[roomNew.id] = roomNew;
}
function roomRemove(roomOld) {
    delete rooms[roomOld.id];
}

//------------------------------------------------
class Room {
    constructor(options) {
        this.id = `Room_${Math.floor(Math.random()*10000)}`;
        roomAdd(this);
        this.width = 1024;
        this.height = 1024;
        this.particles = [];
    }
}


//==============================================================================

//------------------------------------------------
let idCount = 0;

//------------------------------------------------
class Particle {
    constructor() {
        this.id = idCount;
        idCount++;
        this.roomId = null;
        this.x = 0;
        this.y = 0;
    }
    place(roomId, posXNew, posYNew) {
        const roomPlacement = roomGetById(roomId);
        if(
            posXNew < 0 || posYNew < 0 ||
            posXNew >= roomPlacement.width || posYNew >= roomPlacement.height
        ) {
            return false;
        }
        const oldRoomId = this.roomId;
        const oldX = this.x;
        const oldY = this.y;
        this.roomId = roomid;
        this.x = posXNew;
        this.y = posYNew;
        if(this.roomId !== oldRoomId) { this.update('roomId');}
        if(this.x !== oldX) { this.update('x');}
        if(this.y !== oldY) { this.update('y');}
        return true;
    }
    translate(deltaX, deltaY) {
        const room = roomGetById(this.roomId);
        const oldX = this.x;
        const oldY = this.y;
        this.x = Math.max(0, Math.min(room.width, this.x+deltaX));
        this.y = Math.max(0, Math.min(room.height, this.y+deltaY));
        if(this.x !== oldX) { this.update('x');}
        if(this.y !== oldY) { this.update('y');}
    }
    update(key) {
        if(!this.updates) { this.updates = {};}
        const updates = this.updates;
        updates[key] = this.key;
    }
}
