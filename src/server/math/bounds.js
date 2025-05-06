class Bounds {
    #center;
    #extents;

    constructor(center, size) {
        this.#center = center;   
        this.#extents = { x: size.x / 2, y: size.y / 2 };
    }

    min() {
        return {x: this.#center.x - this.#extents.x, y: this.#center.y - this.#extents.y}
    }

    max() {
        return {x: this.#center.x + this.#extents.x, y: this.#center.y + this.#extents.y}
    }

    intersects(other) {
        return (
            Math.abs(this.#center.x - other.#center.x) < (this.#extents.x + other.#extents.x) &&
            Math.abs(this.#center.y - other.#center.y) < (this.#extents.y + other.#extents.y)
        );
    }

    contains(point) {
        return (
            Math.abs(this.#center.x - point.x) < this.#extents.x &&
            Math.abs(this.#center.y - point.y) < this.#extents.y
        );
    }

    toString() {
        return `Bounds(center: ${this.center.toString()}, size: ${this.size.toString()})`;
    }
}

export default Bounds;