import Component from './component.js';
import Collider from './collider.js';
import CollisionSystem from '../../system/collisionSystem.js';

class Transform extends Component {
    constructor(entity, position, rotation) {
        super(entity);
        this.position = position;
        this.rotation = rotation;
    }

    translate(vector) {
        this.position.add(vector);
        this.notifyCollisionSystem();
    }

    setPosition(vector) {
        this.position.set(vector);
        this.notifyCollisionSystem();
    }

    rotate(angle) {
        this.rotation += angle;
    }

    setRotation(angle) {
        this.rotation = angle;
    }

    notifyCollisionSystem() {
        if (this.entity.hasComponent(Collider)) {
            const collider = this.entity.getComponent(Collider);
            CollisionSystem.getInstance().updateCollider(collider);
        }
    }
}

export default Transform; // Export the Transform class as the default export