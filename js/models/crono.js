class Crono{
    
    constructor(){

        this.isCounting = false;
        this.countTime = 0;
       
        this.seconds = 0;
        this.minutes = 0;
    }

    startCrono(){

        this.isCounting = true;

    };

    contando(){

        if (this.isCounting){
            this.countTime++;
            this.seconds = Math.floor(this.countTime / 60);
            
        }
    }

    stopCrono(){

        this.isCounting = false;
        console.log(`tiempo: segundos ${this.seconds}`)

    };

    resetCrono(){

        this.countTime = 0;
    }

    pushTime(){
        // esta funcion pasa el tiempo al finalizar partida
    };

}