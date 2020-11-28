window.addEventListener('load', () => {
    
    const gameManager = new GameManager('game-canvas')

    gameManager.start()

    document.addEventListener('keydown', (event) => {
        gameManager.onKeyEvent(event);
    })

    document.addEventListener('keyup', (event) => {
        gameManager.onKeyEvent(event);
    })

    document.addEventListener('mousedown', (target) => {
        gameManager.mouseDownEvent(target);
    })

    document.addEventListener('mousemove', (target) => {
        gameManager.mouseMove(target)
    })

});

