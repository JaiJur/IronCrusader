class Zombie {

    constructor(ctx, x, y, playerX, playerY) {

        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.livePoints = 200;

        this.maxX = Math.floor(this.ctx.canvas.width) - 100;
        this.maxY = Math.floor(this.ctx.canvas.height) - 100;
        this.minX = 50;
        this.minY = 50;

        this.sprite = new Image();
        this.sprite.src = 'images/zombie-sprite.png'
        this.sprite.isReady = false;

        this.sprite.horizontalFrames = 2;
        this.sprite.verticalFrames = 3;
        this.sprite.verticalFramesIndex = 0;
        this.sprite.horizontalFramesIndex = 0;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth / 3;
            this.height = this.sprite.frameHeight / 3;
        }

        this.drawCount = 0;

        this.isDead = false;
        this.score = 100;

        this.movement = {
            moving: true
        }

       

        this.zombieAngle = Math.atan2(playerY - this.y, playerX - this.x)
        
        this.zombieVel = {
            velX: Math.cos(this.zombieAngle),
            velY: Math.sin(this.zombieAngle)
        }
    }  

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.frameWidth * this.sprite.horizontalFramesIndex,
                this.sprite.frameHeight * this.sprite.verticalFramesIndex,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            )

            this.drawCount++;
            this.animate();
        }
    }

    
    animate() {
        if (this.movement.moving) {
            this.animateSprite(1, 0, 2, 20)
        }
    }

    resetAnimation() {
        this.sprite.verticalFramesIndex = 0;
        this.sprite.horizontalFramesIndex = 0;
    }

    animateSprite(initialVerticalIndex, initialHorizontalIndex, segments, frequency) {
        if (this.sprite.verticalFramesIndex != initialVerticalIndex) {
            this.sprite.verticalFramesIndex = initialVerticalIndex;
            this.sprite.horizontalFramesIndex = initialHorizontalIndex;
        } else if (this.drawCount % frequency === 0) {
            this.sprite.horizontalFramesIndex = (this.sprite.horizontalFramesIndex + 1) % segments;
            this.drawCount = 0;
        }
    }

    move() {
        this.x = this.x + this.zombieVel.velX;
        this.y = this.y + this.zombieVel.velY;
    }

    getDamage(){
        this.livePoints -= 50;

        if (this.livePoints <= 0){
            this.isDead = true;
        }

    }

    collides(anyObject) {
        
        const zombieCollision = this.x + this.width > anyObject.x &&
            this.x < anyObject.x + anyObject.width &&
            this.y + this.height > anyObject.y &&
            this.y < anyObject.y + anyObject.height;

        return zombieCollision;

    };

}