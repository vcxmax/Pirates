class SpriteRenderer {
    constructor(object, spriteSheet, frameSize, animations, animationSpeed = 100) {
        this.object = object;
        this.spriteSheet = spriteSheet;
        this.frameSize = frameSize;
        this.animations = animations;
        this.animationSpeed = animationSpeed;
        this.currentAnimation = "idle";
        this.frameIndex = 0;
        this.lastFrameTime = 0;
    }

    setAnimation(animationName) {
        if (this.currentAnimation !== animationName && this.animations[animationName]) {
            this.currentAnimation = animationName;
            this.frameIndex = 0;
            this.lastFrameTime = 0;
        }
    }

    update(deltaTime) {
        const animation = this.animations[this.currentAnimation];
        if (!animation) return;

        this.lastFrameTime += deltaTime;
        if (this.lastFrameTime >= this.animationSpeed) {
            this.frameIndex = (this.frameIndex + 1) % animation.length;
            this.lastFrameTime = 0;
        }
    }

    render(context, camera) {
        const animation = this.animations[this.currentAnimation];
        if (!animation) return;

        const sourceX = this.frameIndex * this.frameSize.width;
        const sourceY = animation.row * this.frameSize.height;

        const renderX = this.object.bounds.center.x - camera.bounds.x;
        const renderY = this.object.bounds.center.y - camera.bounds.y;

        context.save();
        context.translate(renderX, renderY);
        context.rotate(this.object.rotation);

        context.drawImage(
            this.spriteSheet,
            sourceX,
            sourceY,
            this.frameSize.width,
            this.frameSize.height,
            -this.frameSize.width / 2,
            -this.frameSize.height / 2,
            this.frameSize.width,
            this.frameSize.height
        );

        context.restore();
    }
}

export default SpriteRenderer