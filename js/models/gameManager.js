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

        this.zombiesArr = []

        this.bulletsArr = [];
        this.bulletX = 0;
        this.bulletY = 0;

        this.score = 0;
      
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

        this.startEnemies();

        if (!this.drawIntervalId) { 
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.checkCollisions();
                this.clearObjects();
               //console.log(this.bulletsArr[0])
            }, this.fps);   


            
            
        }

    }

    startEnemies(){
        const zombie = new Zombie(this.ctx, 750, 750)
        const zombie2 = new Zombie(this.ctx, 750, 200)
        this.zombiesArr.push(zombie,zombie2)
    }

    stop(){
        clearInterval(this.drawIntervalId); 
        this.drawIntervalId = undefined;
    }

    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    }

    draw(){
       
        this.background.draw();
        this.player.draw();
        this.zombiesArr.forEach(zombie => zombie.draw())
        this.bulletsArr.forEach(bullet => bullet.draw())

    }

    move(){
        this.player.move();
        this.bulletsArr.forEach(bullet => bullet.move())
    }

    createBullet(){
      
       const bullet = new Bullet(this.ctx, Math.floor(this.player.x + this.player.width / 2), Math.floor(this.player.y + this.player.height/2), this.bulletX, this.bulletY)
       this.bulletsArr.push(bullet)
       
    }

    clearObjects(){

        this.bulletsArr = this.bulletsArr.filter (bullet => !bullet.isDestroy)
        this.zombiesArr = this.zombiesArr.filter (zombie => !zombie.isDead)
      
    }
  
    checkCollisions(){

        for (let zombie of this.zombiesArr){
            for (let bullet of this.bulletsArr){
                if (zombie.collides(bullet)){
                    zombie.getDamage();
                    bullet.collides(zombie);
                }
            }
        }

    }

}

