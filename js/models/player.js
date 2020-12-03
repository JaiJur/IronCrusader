class Player {

    constructor(ctx, x, y){

        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.lives = 5;
        this.contDamage = 0;
        this.isDead = false;

        this.maxX = Math.floor(this.ctx.canvas.width) -100;
        this.maxY = Math.floor(this.ctx.canvas.height) -100;
        this.minX = 50;
        this.minY = 50;

        this.vx = 0;
        this.vy = 0;

        this.sprite = new Image();
        this.sprite.src = 'images/player-sprite.png'
        this.sprite.isReady = false;

        this.sprite.horizontalFrames = 2;
        this.sprite.verticalFrames = 5;
        this.sprite.verticalFramesIndex = 0;
        this.sprite.horizontalFramesIndex = 0;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth/3;
            this.height = this.sprite.frameHeight/3;
        }

        this.movement = {
            up: false,
            right: false,
            down: false,
            left: false,
            shoot: false
        }

        this.drawCount = 0;

        this.rotation = 0;
        this.mouseX = 0;
        this.mouseY = 0;

        this.sprite.midWidth = this.sprite.width/2;
        this.sprite.midHeight = this.sprite.height/2;
        
    }


    // EVENTOS

    onKeyEvent(event){

        const state = event.type === 'keydown';

        switch (event.keyCode){
            case KEY_RIGHT:
                this.movement.right = state;
                break;
            case KEY_LEFT:
                this.movement.left = state;
                break;
            case KEY_UP:
                this.movement.up = state;
                break;
            case KEY_DOWN:
                this.movement.down = state;
                break;
        }
    }

    mouseMove(target) {
        this.mouseX = target.x;
        this.mouseY = target.y;
        
    }

    mouseDownEvent(target) {
       this.movement.shoot = true;
    }
    mouseUpEvent(target) {
        this.movement.shoot = false;
    }

    // METODOS

    draw() {
        if (this.sprite.isReady){
            
            this.ctx.save()
            
            this.ctx.translate(this.x + this.width/2, this.y + this.height/2)

            this.rotatePlayer()

            this.ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2)      
            
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
            );
            
            this.ctx.restore()

            this.drawCount++;
            this.animate();
            
        }
    }

    rotatePlayer(){       
         const angle = Math.atan2(           
            this.mouseY - this.y,
            this.mouseX - this.x
         );     

         this.ctx.rotate(angle)
    }

    move(){

        if(this.movement.right){
            this.vx = SPEED;
        } else if(this.movement.left){
            this.vx = -SPEED;
        } else if (this.movement.up) {
            this.vy = -SPEED;
        } else if (this.movement.down) {
            this.vy = SPEED;
        } else {
            this.vx = 0;
            this.vy = 0;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x > this.maxX){
            this.x = this.maxX;
        } else if (this.x < this.minX){
            this.x = this.minX;
        } else if (this.y < this.minY){
            this.y = this.minY;
        } else if (this.y > this.maxY){
            this.y = this.maxY;
        }
    }

    animate() {
        if (this.movement.right) {
            this.animateSprite(2,0,2,15)
         
        } else if (this.movement.left){
            this.animateSprite(4,0,2,15)
      
        } else if (this.movement.up){
            this.animateSprite(3,0,2,15)
           
        } else if (this.movement.down){
            this.animateSprite(1,0,2,15)
         
        }       
    }

    resetAnimation(){
        this.sprite.verticalFramesIndex = 0;
        this.sprite.horizontalFramesIndex = 0;
    }   

    animateSprite(initialVerticalIndex, initialHorizontalIndex, segments, frequency) {
        if (this.sprite.verticalFramesIndex != initialVerticalIndex){
            this.sprite.verticalFramesIndex = initialVerticalIndex;
            this.sprite.horizontalFramesIndex = initialHorizontalIndex;
        } else if (this.drawCount % frequency === 0){
            this.sprite.horizontalFramesIndex = (this.sprite.horizontalFramesIndex + 1) % segments;
            this.drawCount = 0;
        }
    }

    getDamageZombie(){
       
        this.contDamage ++;

        
        if (this.contDamage > 50){
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
            this.lives--;
            this.contDamage = 0;

            console.log('recibe daño ', this.lives)
        }

        if (this.lives < 1){
            this.isDead = true;
            this.sprite.isReady = false;
            console.log( 'muere' )
        }
    }

    getDamageTurret() {

        this.lives--;

        this.ctx.fillStyle = "red";

        this.ctx.fillRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height)

        console.log('recibe daño ', this.lives)

        if (this.lives < 1) {
            this.isDead = true;
            this.sprite.isReady = false;
            console.log('muere')
        }
    }

    setLivesStats(){

       
        let life1 = document.getElementById('life-01')
        let life2 = document.getElementById('life-02')
        let life3 = document.getElementById('life-03')
        let life4 = document.getElementById('life-04')
        let life5 = document.getElementById('life-05')

       if (this.lives === 4){
           life1.classList.add('ocultar')
       } else if (this.lives === 3){
           life2.classList.add('ocultar')
       } else if (this.lives === 2){
            life3.classList.add('ocultar')
       } else if (this.lives === 1){
           life4.classList.add('ocultar')
       } else if (this.lives === 0){
           life5.classList.add('ocultar')
       } 

    }

    resetLives(){

        let life1 = document.getElementById('life-01')
        let life2 = document.getElementById('life-02')
        let life3 = document.getElementById('life-03')
        let life4 = document.getElementById('life-04')
        let life5 = document.getElementById('life-05')

        life1.classList.remove('ocultar')
        life2.classList.remove('ocultar')
        life3.classList.remove('ocultar')
        life4.classList.remove('ocultar')
        life5.classList.remove('ocultar')

    }
}