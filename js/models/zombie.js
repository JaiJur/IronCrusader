class Zombie {

    constructor(ctx, x, y, playerX, playerY) {

        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.livePoints = 300;

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

        this.state = {
            moving: true,
            attack: false
        }

        this.zombieAngle = 0;

        this.playerX = playerX;
        this.playerY = playerY;


       
    }  

    draw() {
        if (this.sprite.isReady) {
           
            this.ctx.save()

            this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
            this.ctx.rotate(this.zombieAngle)
            this.ctx.translate(-this.x - this.width / 2, - this.y - this.height / 2)

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

            this.ctx.restore();
         
            this.drawCount++;
            this.animate();

        }
    }

    
    animate() {
        if (this.state.moving) {
            this.animateSprite(1, 0, 2, 20)
        }

        if (this.state.attack){
            this.animateSprite(2, 0, 2, 20)
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


    move(playerY, playerX) {

        if (this.state.moving){

            this.zombieAngle = Math.atan2(playerY - this.y, playerX - this.x)

            this.zombieVel = {
                velX: Math.cos(this.zombieAngle),
                velY: Math.sin(this.zombieAngle)
            }

            this.x += this.zombieVel.velX;
            this.y += this.zombieVel.velY;

            if (this.x > this.maxX) {
                this.zombieVel.velX = -this.zombieVel.velX;
            } else if (this.x < this.minX) {
                this.zombieVel.velX = -this.zombieVel.velX;    
            } else if (this.y < this.minY) {
                this.zombieVel.velY = -this.zombieVel.velY;
            } else if (this.y > this.maxY) {
                this.zombieVel.velY = -this.zombieVel.velY;         
            }
        }
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