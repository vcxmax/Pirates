class World {
    constructor(tileSize, objectTileSize, width, height) {
        this.tileSize = tileSize; // Size of terrain tiles (e.g., 32x32 pixels)
        this.objectTileSize = objectTileSize; // Size of object tiles (e.g., 128x128 pixels)
        this.width = width; // Number of terrain tiles horizontally
        this.height = height; // Number of terrain tiles vertically

        this.tileMap = Array.from({ length: height }, () =>
            Array.from({ length: width }, () => ({ type: "land" })) // Default terrain type
        );

        this.tiles = new Map(); // Map for dynamic objects
    }

    // Get the terrain tile coordinates for a given position
    getTerrainTile(position) {
        return {
            x: Math.floor(position.x / this.tileSize),
            y: Math.floor(position.y / this.tileSize),
        };
    }

    // Get the object tile coordinates for a given position
    getObjectTile(position) {
        return {
            x: Math.floor(position.x / this.objectTileSize),
            y: Math.floor(position.y / this.objectTileSize),
        };
    }

    // Convert object tile coordinates to a unique key for the Map
    toObjectTileKey(tileX, tileY) {
        return (tileX << 16) | (tileY & 0xffff);
    }

    // Add a dynamic object to the world
    addObject(object) {
        const bounds = object.bounds;
        const minTile = this.getObjectTile(bounds.min);
        const maxTile = this.getObjectTile(bounds.max);

        for (let x = minTile.x; x <= maxTile.x; x++) {
            for (let y = minTile.y; y <= maxTile.y; y++) {
                const tileKey = this.toObjectTileKey(x, y);
                if (!this.tiles.has(tileKey)) {
                    this.tiles.set(tileKey, new Set());
                }
                this.tiles.get(tileKey).add(object);
            }
        }
    }

    // Remove a dynamic object from the world
    removeObject(object) {
        for (const [tileKey, colliders] of this.tiles.entries()) {
            if (colliders.has(object)) {
                colliders.delete(object);
                if (colliders.size === 0) {
                    this.tiles.delete(tileKey);
                }
            }
        }
    }

    // Get visible dynamic objects within the camera's bounds
    getVisibleObjects(camera) {
        const visibleObjects = new Set();
        const bounds = camera.bounds;

        const minTile = this.getObjectTile(bounds.min);
        const maxTile = this.getObjectTile(bounds.max);

        for (let x = minTile.x; x <= maxTile.x; x++) {
            for (let y = minTile.y; y <= maxTile.y; y++) {
                const tileKey = this.toObjectTileKey(x, y);
                const objectsInTile = this.tiles.get(tileKey);

                if (objectsInTile) {
                    for (const object of objectsInTile) {
                        if (object.bounds.intersects(bounds)) {
                            visibleObjects.add(object);
                        }
                    }
                }
            }
        }

        return visibleObjects;
    }

    // Set the type of a terrain tile
    setTerrainTileType(x, y, type) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.tileMap[y][x].type = type;
        }
    }
}

export default World;