class GameManager{

    constructor(canvasId){

        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1024;
        this.canvas.height = 1024;
        this. ctx = this.canvas.getContext('2d');

        this.restartInterval = undefined;
        
        this.fps = 1000/60;

        this.background = new Background(this.ctx);

        this.player = new Player(this.ctx, 465, 475);
        this.bulletsArr = [];
        this.bulletX = 0;
        this.bulletY = 0;

        this.zombiesArr = []
        this.zombieCounter = 0;

        this.turretsArr = []
        this.turretCounter = 0;
        this.turretBulletsArr = []

        this.crono = new Crono;
        this.reStartCrono = 0;
        this.score = 0;
        this.lastScore = 0;
        this.kills = 0;

        this.toRestart = false;
        
    }

    mouseMove(target){
        this.player.mouseMove(target);
    }

    mouseDownEvent(target){
        this.player.mouseDownEvent(target);
        this.bulletX = target.x;
        this.bulletY = target.y;  
        this.createBullet(target);     

        if(this.toRestart){
            this.restartGame();
        }
    }

    mouseUpEvent(target) {
        this.player.mouseUpEvent(target);
    }

    onKeyEvent(event){
        this.player.onKeyEvent(event);
    }

    start(){

        this.drawStartGame();

        this.score = 0;
        this.kills = 0;

        this.crono.startCrono();

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

    drawStartGame(){

        console.log('1')
        console.log('2')
        console.log('3')
        console.log('GO')

    }

    update(){

        this.crono.printTime()
        this.setGameStats()
        this.player.setLivesStats();
        console.log(this.lastScore)

        if (this.player.isDead){

            this.toRestart = true;

            console.log(`el tiempo: ${this.crono.minutes}:${this.crono.seconds}, puntuación total ${this.score + this.crono.seconds}  y has matado ${this.kills} enemigos`)            

            let bestScoreID = document.getElementById('data-best')
            let lastScoreID = document.getElementById('data-last')

            if (this.score <= this.lastScore){
                console.log('el ultimo es mayor')
                lastScoreID.innerHTML = this.score + Math.floor(this.crono.countTime / 60);

            } else {
                console.log('el ultimo es menor')
                this.lastScore = this.score + Math.floor(this.crono.countTime / 60);
                lastScoreID.innerHTML = this.score + Math.floor(this.crono.countTime / 60);
                bestScoreID.innerHTML = this.score + Math.floor(this.crono.countTime / 60);
            }
                
            
            
            this.resetEnemies();
            this.stop();
            this.crono.stopCrono();
        }



        if(this.zombieCounter === 150){
           this.createZombie();
           this.zombieCounter = 0;
        }

        if(this.turretCounter === 400){
            this.createTurret();
            this.turretCounter = 0;
        }

        this.zombieCounter++;
        this.turretCounter++;
       
        this.crono.contando();
        
    }

    createZombie(){

        if (this.zombiesArr.length <= 8) {
            const zombiePositions = [{x:750, y:750}, { x:750, y:200}, { x:180, y:200}, { x:180, y:750}]
            const randomZombiePos = Math.floor(Math.random() * zombiePositions.length)
            const zombie = new Zombie(this.ctx, zombiePositions[randomZombiePos].x, zombiePositions[randomZombiePos].y, this.player.x, this.player.y)
            this.zombiesArr.push(zombie);
        }
    }

    createTurret(){

        if (this.turretsArr.length <= 5){
            const turretPositions = [{ x: 50, y: 50 }, { x: 900, y: 50 }, { x: 900, y: 900 }, { x: 50, y: 900} ]
            const randomTurretPos = Math.floor(Math.random() * turretPositions.length)
            const turret = new Turret(this.ctx, turretPositions[randomTurretPos].x, turretPositions[randomTurretPos].y)
            this.turretsArr.push(turret)
        }
    }

    startEnemies(){

        this.resetGameStats();
        this.score = 0;
        this.kills = 0;
        this.createZombie()
    }

    resetEnemies(){
        for (let zombie of this.zombiesArr) { zombie.isDead = true; }

        for (let turret of this.turretsArr) { turret.isDead = true; }

        for (let bullet of this.turretBulletsArr) { bullet.isDestroy = true; }

        for (let bullet of this.bulletsArr) { bullet.isDestroy = true; }
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
                
                const turretBullet = new Bullet(this.ctx, Math.floor(turret.x + turret.width/3), Math.floor(turret.y + turret.height/2), this.player.x + this.player.width/2, this.player.y + this.player.height/2)
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
                    this.kills++
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
                    this.kills++
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

    restartGame(){

        if (this.toRestart){
          
            this.resetEnemies();
            this.resetGameStats();
            this.player = new Player(this.ctx, 465, 475);
            this.toRestart = false;
            this.start(); 
        }
    }

    resetGameStats() {

        this.crono.resetCrono();
        this.score = 0;
        this.zombieCounter = 0;
        this.turretCounter = 0;
        this.kills = 0;
        this.player.resetLives();
    }

    setGameStats(){

        let kills = document.getElementById('data-kills')
        let score = document.getElementById('data-score')

        kills.innerHTML = this.kills;
        score.innerHTML = this.score + Math.floor(this.crono.countTime/60);
    }
}

