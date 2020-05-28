

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
        // Direct each particle in room to take its turn
        for(const particle of this.particles) {
            particle.takeTurn();
        }
    }
    package() {
        // Include id and basic metrics
        const updates = {
            id: this.id,
            width: this.width,
            height: this.height,
        };
        // Package each contained particle
        updates.particles = this.particles.map(function (particle) {
            return particle.package();
        });
        // Return update package
        return updates;
    }
}
