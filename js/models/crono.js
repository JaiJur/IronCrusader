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
            this.minutes = Math.floor((this.countTime / 3600) );
            this.seconds = Math.floor((this.countTime / 60) % 60)
        }
    }

    stopCrono(){

        this.isCounting = false;

    };

    resetCrono(){
        this.countTime = 0;
    }

    printTime() {

        let min = document.getElementById('data-min')
        let sec = document.getElementById('data-sec')

        sec.innerHTML = this.seconds;
        min.innerHTML = this.minutes;
    }


}





