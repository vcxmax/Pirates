import SpriteRenderer from '../render/spriteRenderer';
import Bounds from './Bounds';

class Object {
    constructor(position, size, rotation, spriteSheet, frameSize, animations, animationSpeed = 100) {
        this.spriteRenderer = new SpriteRenderer(this, spriteSheet, frameSize, animations, animationSpeed);
        this.bounds = new Bounds(position, size);
        this.rotation = rotation;
    }
}

export default Object;