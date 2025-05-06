class Renderer {
    constructor(canvas, world, camera) {
        this.canvas = canvas;
        this.world = world;
        this.camera = camera;
        this.context = canvas.getContext("2d");
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        this.clear();

        // Translate the canvas based on the camera's position
        this.context.save();
        this.context.translate(-this.camera.position.x, -this.camera.position.y);

        // Render visible terrain tiles directly
        const bounds = this.camera.bounds;
        const minTile = this.world.getTerrainTile(bounds.min);
        const maxTile = this.world.getTerrainTile(bounds.max);

        for (let y = minTile.y; y <= maxTile.y; y++) {
            for (let x = minTile.x; x <= maxTile.x; x++) {
                if (x >= 0 && x < this.world.width && y >= 0 && y < this.world.height) {
                    const tile = this.world.tileMap[y][x];
                    this.renderTerrainTile(x, y, tile.type);
                }
            }
        }

        // Render visible dynamic objects
        const visibleObjects = this.world.getVisibleObjects(this.camera);
        for (const object of visibleObjects) {
            object.spriteRenderer.render(this.context);
        }

        this.context.restore();
    }

    renderTerrainTile(x, y, type) {
        const tileSize = this.world.tileSize;
        const sprite = this.getTileSprite(type); // Get the sprite for the tile type

        if (sprite) {
            this.context.drawImage(
                sprite,
                x * tileSize - this.camera.position.x,
                y * tileSize - this.camera.position.y,
                tileSize,
                tileSize
            );
        }
    }

    getTileSprite(type) {
        // Return the appropriate sprite for the tile type
        switch (type) {
            case "water":
                return this.waterSprite;
            case "land":
                return this.landSprite;
            default:
                return null;
        }
    }
}

export default Renderer;