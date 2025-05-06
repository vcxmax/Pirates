import Entity from '../entity';

class Player extends Entity {
    constructor(id, position, rotation) {
        super(id, position, rotation);

        this.speed = 5; 
        this.velocity = { x: 0, y: 0 }; 
    }

    handleInput(input) {
        if (input.type === 'keyPressed') {
            if (input.key === 'ArrowUp') {
                this.velocity.y = -this.speed;
            } else if (input.key === 'ArrowDown') {
                this.velocity.y = this.speed;
            } else if (input.key === 'ArrowLeft') {
                this.velocity.x = -this.speed;
            } else if (input.key === 'ArrowRight') {
                this.velocity.x = this.speed;
            }
        } else if (input.type === 'keyReleased') {
            if (input.key === 'ArrowUp' || input.key === 'ArrowDown') {
                this.velocity.y = 0;
            } else if (input.key === 'ArrowLeft' || input.key === 'ArrowRight') {
                this.velocity.x = 0;
            }
        }
    }

    onUpdate(delta) {
        this.transform.position.x += this.velocity.x * delta;
        this.transform.position.y += this.velocity.y * delta;

        this.transform.position.x = Math.max(0, Math.min(800, this.transform.position.x));
        this.transform.position.y = Math.max(0, Math.min(600, this.transform.position.y));
    }

    getState() {
        return {
            id: this.id,
            position: this.transform.position,
            rotation: this.transform.rotation,
        };
    }
}

export default Player;