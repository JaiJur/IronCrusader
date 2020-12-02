class GameManager{

    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1024;
        this.canvas.height = 1024;
        this. ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 1000/60;

        this.background = new Background(this.ctx);

        this.player = new Player(this.ctx, 465, 475);
        this.bulletsArr = [];
        this.bulletX = 0;
        this.bulletY = 0;

        this.zombiesArr = []

        this.turretsArr = []
        this.turretBulletsArr = []

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

    mouseUpEvent(target) {
        this.player.mouseUpEvent(target);
    }

    onKeyEvent(event){
        this.player.onKeyEvent(event);
    }

    start(){

        this.startEnemies();

        if (!this.drawIntervalId) { 
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.update();
                this.move();
                this.createTurretBullet();
                this.draw();
                this.checkCollisions();
                this.clearObjects();
            }, this.fps);               
        }
    }

    update(){

        if (this.player.isDead){
            this.stop();
        }
        
    }

    startEnemies(){
        
       // const turret = new Turret (this.ctx, 50, 50)
       // const turret2 = new Turret (this.ctx, 900, 50)
       // const turret3 = new Turret(this.ctx, 900, 900)
       // const turret4 = new Turret(this.ctx, 50, 900)
       // this.turretsArr.push(turret, turret2, turret3, turret4)
        
        const zombie = new Zombie(this.ctx, 750, 750, this.player.x, this.player.y)
        const zombie2 = new Zombie(this.ctx, 750, 200, this.player.x, this.player.y)
        const zombie3 = new Zombie(this.ctx, 180, 200, this.player.x, this.player.y)
        const zombie4 = new Zombie(this.ctx, 180, 750, this.player.x, this.player.y)

        this.zombiesArr.push(zombie, zombie2, zombie3, zombie4)
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
        this.turretsArr.forEach(turret => turret.draw(this.player.y, this.player.x))
        this.turretBulletsArr.forEach(bullet => bullet.draw())
    }

    move(){
        this.player.move();
        this.bulletsArr.forEach(bullet => bullet.move())
        this.turretBulletsArr.forEach(bullet => bullet.move())
        this.zombiesArr.forEach(zombie => zombie.move(this.player.y, this.player.x))
    }

    createBullet(){
      
       const bullet = new Bullet(this.ctx, Math.floor(this.player.x + this.player.width / 2), Math.floor(this.player.y + this.player.height/2), this.bulletX, this.bulletY)
       this.bulletsArr.push(bullet)
    }

    createTurretBullet(){
       
        for (let turret of this.turretsArr){
         
            if (turret.triggerCont === 99){
                
                const turretBullet = new Bullet(this.ctx, Math.floor(turret.x + turret.width/3), Math.floor(turret.y + turret.height/2), this.player.x, this.player.y)
                this.turretBulletsArr.push(turretBullet) 
            }
        }
    }

    clearObjects(){

        this.bulletsArr = this.bulletsArr.filter (bullet => !bullet.isDestroy)
        this.turretBulletsArr = this.turretBulletsArr.filter(bullet => !bullet.isDestroy)
        this.zombiesArr = this.zombiesArr.filter (zombie => !zombie.isDead)
        this.turretsArr = this.turretsArr.filter (turret => !turret.isDead)
    }
  
    checkCollisions(){

        for (let zombie of this.zombiesArr){
            for (let bullet of this.bulletsArr){
                if (zombie.collides(bullet)){
                    zombie.getDamage();
                    bullet.isDestroy = true;
                }

                if (zombie.isDead){
                    this.setScore(100) 
                    break;
                } 
            }
        }

        for (let bullet of this.turretBulletsArr){
            if (bullet.collides(this.player)){
                this.player.getDamageTurret();
                bullet.collides(this.player)
            }
        }

        for (let turret of this.turretsArr) {
            for (let bullet of this.bulletsArr) {

                if (turret.collides(bullet)) {
                    turret.getDamage();
                    bullet.isDestroy = true;
                }

                if (turret.isDead) {
                    this.setScore(200)
                    break;
                }
            }
        }

        for (let zombie of this.zombiesArr){

            if (zombie.collides(this.player)){         
                
                zombie.state.moving = false;
                zombie.state.attack = true;     

                this.player.getDamageZombie();               

            } else {

                zombie.state.moving = true;
                zombie.state.attack = false;
            }
        }
    }

    setScore(puntos){

        this.score += puntos;
       
    }
}

