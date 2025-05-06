class Bounds {
    constructor(center, size) {
        this.center = center;
        this.size = size;
        this.extents = { x: size.x / 2, y: size.y / 2 };
    }

    min() {
        return {x: this.center.x - this.extents.x, y: this.center.y - this.extents.y}
    }

    max() {
        return {x: this.center.x + this.extents.x, y: this.center.y + this.extents.y}
    }

    intersects(other) {
        return (
            Math.abs(this.center.x - other.center.x) < (this.extents.x + other.extents.x) &&
            Math.abs(this.center.y - other.center.y) < (this.extents.y + other.extents.y)
        );
    }

}

export default Bounds;