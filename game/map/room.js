

//== Room ======================================================================

//-- Module Class --------------------------------
export default class Room {
    constructor(id) {
        this.id = id; //`Room_${Math.floor(Math.random()*10000)}`;
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
