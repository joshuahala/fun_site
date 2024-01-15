//board
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var blocksize = screenWidth > screenHeight ? Math.ceil((screenHeight * 0.8)/20) : Math.ceil((screenWidth * 0.8)/20);
// var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

let snakeBody = []

var velocityX = 0;
var velocityY = 0;

//food
var foodX = blocksize * 10;
var foodY = blocksize * 10;

var gameOver = false;

var score = 0
var topScore = 0

window.onload = function() {
    board = document.getElementById('board');
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d"); 
    document.getElementById('score').style.display = "block";    
    
    placeFood();

    document.addEventListener("keyup", changeDirection);

    //touch controls
    let startX;
    let startY;
    let endX;
    let endY;

    document.addEventListener('touchstart', (e) => {
      // Record the starting coordinates
      e.preventDefault();
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY;
    });

    board.addEventListener('touchmove', (e) => {
        e.preventDefault();
    })


    board.addEventListener('touchend', (e) => {
      // Record the ending coordinates
      e.preventDefault();
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      swiped(startX, startY, endX, endY);
    });

    //press enter to restart
    document.addEventListener('keydown', (e) => {
        if (e.key == "Enter" && gameOver == true
        ) {
            restart();
        }
    });


    
    // update();
    setInterval(update, 1000/10);
}

//restart
function restart() {
    placeFood();
    restartHead();
    score = 0;
    document.getElementById('overlay').style.display = "none";
    gameOver = false;
}

function update() {

    if (gameOver){
        return;
    }
    //board
    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height); 
    
    //food
    context.fillStyle = "rgb(130, 93, 33)";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    document.getElementById('scoreSpan').innerHTML = score;


    //eat food
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        // document.getElementById('score').innerHTML = score;


    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    //snake
    context.fillStyle = "rgb(116, 58, 58)"
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize); 
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols * blocksize - 1 || snakeY < 0 || snakeY > rows * blocksize - 1) {
        gameOver = true;
        document.getElementById('overlay').style.display = "block";
        document.getElementById('topScore').style.display = "block"
        if (score > topScore) {
            document.getElementById('topScoreSpan').innerHTML = score;
        }
    }
    
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            document.getElementById('overlay').style.display = "block";
            document.getElementById('topScore').style.display = "block"
            if (score > topScore) {
                document.getElementById('topScoreSpan').innerHTML = score;
            }
            
        }
    }

}

//touch controls
function swiped(startX, startY, endX, endY) {
    //vertical change
    if (Math.abs(startY - endY) > Math.abs(startX - endX) ) {
        //upward movement
        if (endY < startY && velocityY != 1) {
            velocityX = 0;
            velocityY = -1;
        }
        //downward movement
        else if (velocityY != -1) {
            velocityX = 0;
            velocityY = 1;

        }
    }
    //horizontal change
    else if (Math.abs(startX - endX) > Math.abs(startY - endY) ) {
        //right movement
        if (endX > startX && velocityX != -1) {
            velocityX = 1;
            velocityY = 0;
        }
        //left movement
        else if (velocityX != 1) {
            velocityX = -1;
            velocityY = 0;

        }
    }
    
}



function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;
    console.log(foodX,foodY);
}
function restartHead() {
    snakeX = blocksize * 5;
    snakeY = blocksize * 5;
    
    snakeBody = []
    
    velocityX = 0;
    velocityY = 0;
}