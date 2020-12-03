class Bullet{
    constructor(ctx, initX , initY, targetX, targetY){

        this.ctx = ctx;
        
        this.x = initX;
        this.y = initY;

        this.targetX = targetX;
        this.targetY = targetY;

        this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);

        this.totalVel = {
            velX: Math.cos(this.angle) * 10,
            velY: Math.sin(this.angle) * 10, 
        }

        this.sprite = new Image();
        this.sprite.src = 'images/bullet-img.png';
        this.sprite.isReady = false;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.width = this.sprite.width/10;
            this.sprite.height = this.sprite.height/10;
            this.width = this.sprite.width;
            this.height = this.sprite.height;
        }

        this.isDestroy =  false;

    }
    
    draw(){

        this.ctx.save()

        this.ctx.beginPath();
        this.ctx.translate(this.x, this.y)
        this.ctx.rotate(this.angle)
        this.ctx.translate(-this.x, -this.y)
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y , 15, 2)
        this.ctx.fill();
        this.ctx.restore();
    }

   move() {
      this.x = this.x + this.totalVel.velX;
      this.y = this.y + this.totalVel.velY;

       if (this.x > this.ctx.canvas.width ||
           this.y > this.ctx.canvas.height ||
           this.y < 0 || this.x < 0) {
           this.isDestroy = true;
           
       } 
    }
      
    collides(anyObject){
    
        const collide = this.x + this.width > anyObject.x &&
        this.x < anyObject.x + anyObject.width &&
        this.y + this.height > anyObject.y &&
        this.y < anyObject.y + anyObject.height;

        this.isDestroy = collide;

        return collide;
        
    }

}


