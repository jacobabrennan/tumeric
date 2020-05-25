

//==============================================================================

//------------------------------------------------
export const rooms = {};
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
export class Room {
    constructor(options) {
        this.id = `Room_${Math.floor(Math.random()*10000)}`;
        roomAdd(this);
        this.width = 1024;
        this.height = 1024;
        this.particles = [];
    }
    iterate() {
        for(const particle of this.particles) {
            particle.takeTurn();
        }
    }
}


//==============================================================================

//------------------------------------------------
let idCount = 0;

//------------------------------------------------
export class Particle {
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
        // please forgive these next lines
        const roomOld = roomGetById(this.roomId);
        if(roomOld) {
            // roomOld.particles.IJustWantASimpleRemoveFunction
        }
        roomPlacement.particles.push(this);
        this.roomId = roomId;
        this.x = posXNew;
        this.y = posYNew;
        return true;
    }
    translate(deltaX, deltaY) {
        const room = roomGetById(this.roomId);
        this.x = Math.max(0, Math.min(room.width, this.x+deltaX));
        this.y = Math.max(0, Math.min(room.height, this.y+deltaY));
    }
    takeTurn() {}
}
