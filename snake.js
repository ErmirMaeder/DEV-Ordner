
//brett
let blockSize = 15;
let rows = 20;
let cols = 20;
let board;
let context;
let score = 0;

//snake head
let snakeX = blockSize * cols/2;
let snakeY = blockSize * rows/2;
let geschX = 0;
let geschY = 0;
let snakebody =[];
let speed = 200;

//food
let foodX;
let foodY;

let gameOver = false;

let gameInterval = setInterval(update, speed);


window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // wird gebraucht um zu zeichnen

    placeFood();
    document.addEventListener("keyup", keyDirection);
    update();

}

function update(){
    if (gameOver) {
        return;        
    }
    //board zeichnen
    context.fillStyle = "yellowgreen";
    context.fillRect(0, 0, board.width, board.height);

    //food zeichnen
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakebody.push([foodX, foodY])
        placeFood();
        score += 3;
        document.getElementById('scoreValue').textContent = score;
        speed -= 10;
        clearInterval(gameInterval);
        gameInterval = setInterval(update, speed);
    }
    
    for (let i = snakebody.length-1; i > 0; i--) {
        snakebody[i] = snakebody[i-1];
    } if (snakebody.length) {
        snakebody[0]=[snakeX, snakeY];
    }

      //schlange zeichnen
      context.fillStyle = "black";
      snakeX += geschX * blockSize;
      snakeY += geschY * blockSize;
      context.fillRect(snakeX, snakeY, blockSize, blockSize)
      for (let i = 0; i < snakebody.length; i++) {
        context.fillRect(snakebody[i][0],snakebody[i][1], blockSize, blockSize);
      }


      //game over

      if (snakeX < 0 || snakeX > board.width-blockSize || snakeY < 0 || snakeY > board.height - blockSize) {
        gameOver = true;
        alert("Game Over!")
      }

      for (let i = 0; i < snakebody.length; i++) {
        if(snakeX == snakebody[i][0] && snakeY == snakebody[i][1]){ 
        gameOver = true;
        alert("Game Over!")
      }
    }
}

function reStart(){
        speed = 200;
        clearInterval(gameInterval); // Aktuelles Intervall stoppen
        snakeX = blockSize * cols/2;
        snakeY = blockSize * rows/2;
        geschX = 0;
        geschY = 0;
        snakebody =[];
        score = 0;
        document.getElementById('scoreValue').textContent = score; // Wert im HTML aktualisieren
        snakebody =[];
        gameOver = false;
        placeFood();
        document.addEventListener("keyup", keyDirection);
        gameInterval = setInterval(update, speed); // Neues Intervall starten
    }
    

function keyDirection(e){
    if (e.code == "ArrowUp" && geschY != 1) {
        geschX = 0;
        geschY = -1;
    }

    else if (e.code == "ArrowDown"&& geschY != -1) {
        geschX = 0;
        geschY = 1;
    }

    else if (e.code == "ArrowLeft"&& geschX != 1) {
        geschX = -1;
        geschY = 0;
    }

    else if (e.code == "ArrowRight" && geschX != -1) {
        geschX = 1;
        geschY = 0;
    }

}

function changeDirection(direction){
    if (direction == "ArrowUp" && geschY != 1) {
        geschX = 0;
        geschY = -1;
    }

    else if (direction == "ArrowDown"&& geschY != -1) {
        geschX = 0;
        geschY = 1;
    }

    else if (direction == "ArrowLeft"&& geschX != 1) {
        geschX = -1;
        geschY = 0;
    }

    else if (direction == "ArrowRight" && geschX != -1) {
        geschX = 1;
        geschY = 0;
    }
}

// food random platzieren
function placeFood(){ 
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function placeSnake(){
    snakeX = Math.floor(Math.random()*cols)*blockSize;
    snakeY = Math.floor(Math.random()*cols)*blockSize;
}
