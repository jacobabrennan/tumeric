

//== Particle ==================================================================

//-- Dependencies --------------------------------
import { roomGetById } from './map.js';

//-- Internal State ------------------------------
let idCount = 0;

//-- Module Class --------------------------------
export default class Particle {
    constructor() {
        this.id = idCount;
        idCount++;
        this.roomId = null;
        this.x = NaN;
        this.y = NaN;
    }
    place(roomId, posXNew, posYNew) {
        // If new such new room exists, remove particle from map and return success
        const roomPlacement = roomGetById(roomId);
        if(!roomPlacement) {
            this.unplace();
            return true;
        }
        // If particle cannot be placed at given coords, then return failure
        if(
            posXNew < 0 || posYNew < 0 ||
            posXNew >= roomPlacement.width || posYNew >= roomPlacement.height
        ) {
            return false;
        }
        // If new room differs from current room, modify particle arrays as necessary
        const roomOld = roomGetById(this.roomId);
        if(roomOld !== roomPlacement) {
            // Remove from old room, if necessary
            if(roomOld) {
                const particleIndex = roomPlacement.particles.indexOf(this);
                if(particleIndex !== -1) {
                    roomPlacement.particles.splice(particleIndex, 1);
                }
            }
            // Add to new room
            roomPlacement.particles.push(this);
        }
        // Set Properties on particle
        this.roomId = roomId;
        this.x = posXNew;
        this.y = posYNew;
        // Return success
        return true;
    }
    unplace() {
        // Remove particle from room's particles array
        const roomOld = roomGetById(this.roomId);
        if(roomOld) {
            const particleIndex = roomOld.particles.indexOf(this);
            if(particleIndex !== -1) {
                roomOld.particles.splice(particleIndex, 1);
            }
        }
        // Blank properties on particle
        this.roomId = null;
        this.x = NaN;
        this.y = NaN;
        // Return success
        return true;
    }
    translate(deltaX, deltaY) {
        // If object is located in room, and no movement is specified, return success
        const roomCurrent = roomGetById(this.roomId);
        if(roomCurrent && !deltaX && !deltaY) { return true;}
        // Move the particle
        const oldX = this.x;
        const oldY = this.y;
        this.x = Math.max(0, Math.min(roomCurrent.width, this.x+deltaX));
        this.y = Math.max(0, Math.min(roomCurrent.height, this.y+deltaY));
        // If no movement occurred, return failure
        if(this.x === oldX && this.y === oldY) { return false;}
        // Otherwise, return success
        return true;
    }
    takeTurn() {}
}
