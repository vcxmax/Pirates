class Vector {

    static Zero = new Vector(0, 0); 
    static One = new Vector(1, 1);

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    set(vector) {
        this.x = vector.x;
        this.y = vector.y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    distance(vector) {
        const dx = this.x - vector.x;
        const dy = this.y - vector.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    normalize() {
        const length = this.length();
        if (length > 0) {
            this.x /= length;
            this.y /= length;
        }
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

}

export default Vector;