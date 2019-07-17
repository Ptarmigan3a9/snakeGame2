window.onload = function () {
    var stage = document.getElementById('stage');
    var context = stage.getContext('2d');
    var title = document.getElementById('h1');
    document.addEventListener('keydown', keyPush);

    setInterval(game, 120);

    const vel = 1;

    title.innerHTML += '&#x1F40D';
    var cont = 0;
    var velX = 0;
    var velY = 0;
    var pointX = 10;
    var pointY = 15;
    var lenBlock = 22.5;
    var countBlocks = 20;
    var appleX = 15;
    var appleY = 15;

    var trail = [];
    var tail = 5;

    function game() {
        pointX += velX;
        pointY += velY;
        if (pointX < 0) {
            pointX = countBlocks - 1;
        }
        if (pointX > countBlocks - 1) {
            pointX = 0;
        }
        if (pointY < 0) {
            pointY = countBlocks - 1;
        }
        if (pointY > countBlocks - 1) {
            pointY = 0;
        }

        context.fillStyle = 'black';
        context.fillRect(0, 0, stage.width, stage.height);

        context.fillStyle = 'red';
        context.fillRect(appleX * lenBlock, appleY * lenBlock, lenBlock, lenBlock);

        context.fillStyle = 'green';
        for (var i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x * lenBlock, trail[i].y * lenBlock, lenBlock, lenBlock);
            if (trail[i].x == pointX && trail[i].y == pointY) {
                velX = 0;
                velY = 0;
                tail = 5;
                if (cont > 0) {
                    window.alert('Você perdeu!');
                    cont = 0;
                }
            }
        }
        trail.push({ x: pointX, y: pointY });
        while (trail.length > tail) {
            trail.shift();
        }
        if (appleX == pointX && appleY == pointY) {
            tail++;
            appleX = Math.floor(Math.random() * countBlocks);
            appleY = Math.floor(Math.random() * countBlocks);
        }
    }
    function keyPush(event) {
        cont++;
        switch (event.keyCode) {
            case 37: //seta para esquerda
                velX = -vel;
                velY = 0;
                break;
            case 38: //seta para cima
                velX = 0;
                velY = -vel;
                break;
            case 39: //seta para direita
                velX = vel;
                velY = 0;
                break;
            case 40: //seta para baixo
                velX = 0;
                velY = vel;
                break;
        }
    }
}