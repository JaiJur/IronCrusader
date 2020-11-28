class Turret {

    constructor(ctx, x, y) {

        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.vx = 0;
        this.vy = 0;

        this.sprite = new Image();
        this.sprite.src = 'images/turret-img.png'
        this.sprite.isReady = false;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.width = sprite.width;
            this.sprite.height = sprite.height;
        }

        this.aiming = {
            aiming: false
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

    move() {
        if (this.movement.moving){
            this.vx = SPEED;
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
}