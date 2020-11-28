class Zombie {

    constructor(ctx, x, y) {

        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.width = 0;
        this.height = 0;

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

        this.movement = {
            moving: true
        }

        this.drawCount = 0;

        this.isDead = false;
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
        } else {
            this.resetAnimation()
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

    }


    getDamage(){
        this.livePoints -= 50;

        if (this.livePoints <= 0){
            this.death();
        }

        console.log(this.livePoints);
    }

    death(){
        
        this.isDead = true;

        console.log('sumar puntos a la partida');
        
    }

    collides(anyObject) {
        
        const zombieCollision = this.x + this.width > anyObject.x &&
            this.x < anyObject.x + anyObject.width &&
            this.y + this.height > anyObject.y &&
            this.y < anyObject.y + anyObject.height;


        return zombieCollision;

    };
}