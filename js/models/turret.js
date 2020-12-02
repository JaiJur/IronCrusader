class Turret {

    constructor(ctx, x, y, playerX, playerY) {

        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.livePoints = 500;

        this.sprite = new Image();
        this.sprite.src = 'images/turret-img.png'
        this.sprite.isReady = false;

        this.sprite.horizontalFrames = 1;
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFramesIndex = 0;
        this.sprite.horizontalFramesIndex = 0;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = this.sprite.width;
            this.sprite.frameHeight = this.sprite.height;
            this.width = this.sprite.frameWidth / 10;
            this.height = this.sprite.frameHeight / 10;
        }

        this.triggerCont = 0;
        this.isFiring = false;

        this.isDead = false;
        this.score = 100;

        this.state = {
            looking: true,
            attack: false
        }

        this.turretAngle = 0;

        this.playerX = playerX;
        this.playerY = playerY;
       
    }  

    draw(playerY, playerX) {

        if (this.sprite.isReady) {
           
            this.ctx.save()

            this.ctx.translate(this.x + this.width/3 , this.y + this.height/2)

            this.rotateTurret(playerY, playerX)

            this.ctx.translate(-this.x - this.width/3, -this.y - this.height/2 )

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
            
            this.triggerCont++;
            
            if (this.triggerCont >= 100) {
                this.triggerCont = 0;
                this.shoot();
            }
        }
    }

    rotateTurret(playerY, playerX) {

        if (this.state.looking){
        
            this.turretAngle = Math.atan2(playerY - this.y, playerX - this.x)
           
            this.ctx.rotate(this.turretAngle)
          
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

    shoot(){

        this.isFiring = true;

        this.isFiring = false;
        
    }
}