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

        this.bullet = new Bullet()

        this.bulletsArr = [];
        this.bulletX = 0;
        this.bulletY = 0;
      
    }

    mouseMove(target){
        this.player.mouseMove(target);
        
    }

    mouseDownEvent(target){
        this.player.mouseDownEvent(target);
        this.bullet.clickEvent(target);
        this.bulletX = target.x;
        this.bulletY = target.y;  
        console.log(Math.floor(this.player.x + this.player.width / 2), Math.floor(this.player.y + this.player.height / 2))
        console.log(this.bulletX, this.bulletY)
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
       
      // this.destroyBulletElapsedTime()

       if(this.bulletsArr.length === 10){
           this.bulletsArr.length = 0
           console.log(this.bulletsArr.length)
       };
       
   }

  //  destroyBulletElapsedTime() {
//
  //      setInterval(() => {
  //         this.bulletsArr.shift();
  //      }, 2500)
//
  //      clearInterval();
  //  }

    destroyBulletNow(){
        this.bulletsArr.shift();
    }

    checkCollisions(){
        if (this.bullet.collides(this.zombie)){

            console.log('le he dado al zombie')

            this.bullet.x = -100;
            this.bullet.y = -100;

            this.zombie.getDamage();
            this.destroyBulletNow();
        }

        if (this.bullet.collides(this.player)) {
            console.log('jugador impactado')
            this.bullet.x = -100;
            this.bullet.y = -100;
        }
    };

}

