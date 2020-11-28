class GameManager{

    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1024;
        this.canvas.height = 1024;
        this. ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 1000/60;

        this.background = new Background(this.ctx);

        this.player = new Player(this.ctx, 400, 400);

        this.zombie = new Zombie(this.ctx, 700,700);

        this.bulletsArr = [];
        this.bulletX = 0;
        this.bulletY = 0;
      
    }

    mouseMove(target){
        this.player.mouseMove(target);
        
    }

    mouseDownEvent(target){
        this.player.mouseDownEvent(target);
        this.bulletX = target.x;
        this.bulletY = target.y;  
        this.createBullet(target);     
        
    }

    onKeyEvent(event){
        this.player.onKeyEvent(event);
    }

    start(){
        if (!this.drawIntervalId) { 
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.checkCollisions();
                this.clearObjects();
                
            }, this.fps);                       
        }
    }

    stop(){
        clearInterval(this.drawIntervalId); // quitar para que no limpie la pantalla, por ejemplo para crear una pausa
        this.drawIntervalId = undefined;
    }

    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    }

    draw(){
        this.background.draw();
        this.player.draw();
        this.zombie.draw();
        this.bulletsArr.forEach(bullet => bullet.draw());
    }

    move(){
        this.player.move();
        this.bulletsArr.forEach(bullet => bullet.move())
    }

    createBullet(){
      
       const bullet = new Bullet(this.ctx, Math.floor(this.player.x + this.player.width / 2), Math.floor(this.player.y + this.player.height/2), this.bulletX, this.bulletY)
      
       this.bulletsArr.push(bullet)

       if(this.bulletsArr.length === 10){
           //this.destroyBullet();
           this.bulletsArr.length = 0
           console.log(this.bulletsArr.length)
       };
       
    }

    clearObjects(){

        this.bulletsArr = this.bulletsArr.filter(bullet => !bullet.isDestroy)
    }
  

    checkCollisions(){


        this.bulletsArr.forEach(bullet => {

            if (bullet.collides(this.zombie)) {

                console.log('le he dado al zombie')

                this.zombie.getDamage();

            }

        });
       
    };

}

