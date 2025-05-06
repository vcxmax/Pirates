class CollisionSystem {
    constructor(tileSize) {
        if (CollisionSystem.instance) {
            return CollisionSystem.instance;
        }
        CollisionSystem.instance = this;

        this.tileSize = tileSize;
        this.tiles = new Map();
        this.dirtyColliders = new Set();
    }

    static getInstance(tileSize) {
        if (!CollisionSystem.instance) {
            CollisionSystem.instance = new CollisionSystem(tileSize);
        }
        return CollisionSystem.instance;
    }

    getTile(position) {
        return {x: Math.floor(position.x / this.tileSize), y: Math.floor(position.y / this.tileSize)};
    }

    toTileKey(tileX, tileY) {
        return (tileX << 16) | (tileY & 0xFFFF);
    }

    addCollider(collider) {
        const bounds = collider.bounds;
        const minTile = this.getTile(bounds.min);
        const maxTile = this.getTile(bounds.max);

        for (let x = minTile.x; x <= maxTile.x; x++) {
            for (let y = minTile.y; y <= maxTile.y; y++) {
                const tileKey = this.toTileKey(x, y);
                if (!this.tiles.has(tileKey)) {
                    this.tiles.set(tileKey, new Set());
                }
                this.tiles.get(tileKey).add(collider);
            }
        }
    }

    removeCollider(collider) {
        for (const [tileKey, colliders] of this.tiles.entries()) {
            if (colliders.has(collider)) {
                colliders.delete(collider);
                if (colliders.size === 0) {
                    this.tiles.delete(tileKey);
                }
            }
        }
    }

    updateCollider(collider) {
        this.removeCollider(collider);
        this.addCollider(collider);
        this.dirtyColliders.add(collider);
    }

    update() {
        for (const collider of this.dirtyColliders) {
            const bounds = collider.bounds;
            const minTile = this.getTile(bounds.min());
            const maxTile = this.getTile(bounds.max());

            const checkedColliders = new Set();

            for (let x = minTile.x; x <= maxTile.x; x++) {
                for (let y = minTile.y; y <= maxTile.y; y++) {
                    const tileKey = this.toTileKey(x, y);
                    const collidersInTile = this.tiles.get(tileKey);

                    if (collidersInTile) {
                        for (const otherCollider of collidersInTile) {
                            if (collider !== otherCollider && !checkedColliders.has(otherCollider)) {
                                if (collider.isColliding(otherCollider)) {
                                    collider.entity.onCollision(otherCollider.entity);
                                    otherCollider.entity.onCollision(collider.entity);
                                }
                                checkedColliders.add(otherCollider);
                            }
                        }
                    }
                }
            }
        }

        this.dirtyColliders.clear();
    }
}

export default CollisionSystem;