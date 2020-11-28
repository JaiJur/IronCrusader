class Bullet{
    constructor(ctx, initX , initY, targetX, targetY){

        this.ctx = ctx;
        
        this.initX = initX;
        this.initY = initY;

        this.targetX = targetX;
        this.targetY = targetY;

        this.angle = Math.atan2(this.targetY - this.initY, this.targetX - this.initX);

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

    clickEvent(target) {

     //  console.log(target.x, target.y)
     //  this.x = target.x;
     //  this.y = target.y;  
     //
      // this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);

     //  console.log(this.angle)
     //  console.log(target)

         //  this.totalVel = {
         //  velX: Math.cos(this.angle),
         //  velY: Math.sin(this.angle)
         //  }

      //// https://www.youtube.com/watch?v=eI9idPTT0c4 /// <-- la verdad está ahí!
       
    }
    
    draw(){

        this.ctx.beginPath();
        this.ctx.arc(this.initX, this.initY, 5, 0, Math.PI * 2, false);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();

        // TODO destruir cuando sale

       //if (this.sprite.isReady){
       //    this.ctx.drawImage(
       //        this.sprite,
       //        this.x,
       //        this.y,
       //        this.sprite.width,
       //        this.sprite.height
       //    )

       //    console.log('pinta la bala')
       //}      
    }

   move() {
      this.initX = this.initX + this.totalVel.velX;
      this.initY = this.initY + this.totalVel.velY;
   }

   destroy(){
       console.log('eliminar bala');
   }

    collides(anyObject){
    
        const collide = this.initX + this.width > anyObject.x &&
        this.initX < anyObject.x + anyObject.width &&
        this.initY + this.height > anyObject.y &&
        this.initY < anyObject.y + anyObject.height;

        this.isDestroy = collide;

        return collide;
        
    };
}


