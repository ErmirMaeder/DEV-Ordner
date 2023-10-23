
//brett
let blockSize = 15;
let rows = 20;
let cols = 20;
let board;
let context;
let score = 0;

//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let geschX = 0;
let geschY = 0;
let snakebody =[];

//food
let foodX;
let foodY;

let gameOver = false;


window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // wird gebraucht um zu zeichnen

    placeFood();
    document.addEventListener("keyup", keyDirection);
    //update();
    setInterval(update, 200);
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
    placeFood();
    score = 0;
    document.addEventListener("keyup", keyDirection);
    //update();
    setInterval(update, 200);
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



