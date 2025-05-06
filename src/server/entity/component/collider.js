import Component from './component'; // Import the Component class
import transform from './transform'; // Import the Component class
import Bounds from '../../math/bounds';

class Collider extends Component {
    constructor(entity, size) {
        super(entity);
        this.transform = entity.transform; 
        this.bounds = new Bounds(transform.position, size);
    }

    isColliding(other) {
        return this.bounds.intersects(other.bounds);
    }

    contains(point) {
        return this.bounds.contains(point);
    }
}

export default Collider;