var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var blockSize = 25
var rows = 20;
var cols = 20;

var lives = 3;
var score = 0;
var alreadyIncreased = false;
var difficulty = 1;

var heroX = 5 * blockSize;
var heroY = 5 * blockSize;

var goalX = 0 * blockSize;
var goalY = 0 * blockSize;

var heroVelocX = 0;
var heroVelocY = 0;

var spawnHazards = false;

let lastSpawnTime = Date.now();


// var hazX = 0;
// var hazY = 0;
// var hazVelocX = 0;
// var hazVelocY = 0;
// var hazDir = "";

class Hazard {
    constructor(hazX, hazY, hazVelocX, hazVelocY, hazDir) {
        this.hazX = hazX;
        this.hazY = hazY;
        this.hazVelocX = hazVelocX;
        this.hazVelocY = hazVelocY;
        this.hazDir = hazDir;
    }
    move(speed) {
        if (this.hazVelocX == 1) {
        this.hazX += 1 * 12.5 * speed;
        }
        else if (this.hazVelocX == -1) {
            this.hazX -= 1 * 12.5 * speed;
        }
        else if (this.hazVelocY == 1) {
            this.hazY += 1 * 12.5 * speed;
        }
        else if (this.hazVelocY == -1) {
            this.hazY -= 1 * 12.5 * speed;
        }
    }
}

var hazards = [];

window.onload = function () {
    canvas = document.getElementById('canvas');
    canvas.width = cols * blockSize;
    canvas.height = rows * blockSize;
    context = canvas.getContext("2d");

    setGoal();

    document.addEventListener("keydown", arrowMove);
    document.addEventListener("keyup", (e) => {
        if (e.key == " ") {
            spawnHazards = !spawnHazards;
            lives = 3;
            score = 0;
        }
    });

    setInterval(update, 1000/10);
}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "aquamarine";
    context.fillRect(heroX, heroY, blockSize, blockSize);

    context.fillStyle = "lime";
    context.fillRect(goalX, goalY, blockSize, blockSize);

    //check if reached goal
    if (goalX == heroX && goalY == heroY) {
        score ++;
        setGoal();
        //reset alreadyIncreased
        alreadyIncreased = false;
    }
    
    if (Date.now() - lastSpawnTime >= 400 && hazards.length < 8 && spawnHazards) {
        spawn();
        lastSpawnTime = Date.now();
    }

    //update each hazard
    for (let i=0; i<hazards.length; i++) {
        difficulty <= 1? speed = 1 : speed = 2;
        let hazX = hazards[i].hazX;
        let hazY = hazards[i].hazY;
        context.fillStyle = "red";
        context.fillRect(hazX, hazY, blockSize, blockSize);
        hazards[i].move(speed);
        if (hazX > 19 * blockSize || hazX < 0 || hazY > 19 * blockSize || hazY < 0) {
            console.log("out!");
            hazards.splice(0,1);
        }
       
        if (heroX == hazX && heroY == hazY) {
            lives --;
            console.log(lives);

            // Flash the canvas red
            context.fillStyle = "#390000";
            context.fillRect(0, 0, canvas.width, canvas.height);

            // After 100ms, revert the canvas color back to black
            setTimeout(() => {
                context.fillStyle = "black";
                context.fillRect(0, 0, canvas.width, canvas.height);
            }, 100);
        }
    }

    //increase difficulty
    if (score % 5 == 0 && score != 0 && !alreadyIncreased){
        alreadyIncreased = true;
        difficulty ++;
    }

    //change score
    document.getElementById('score').innerHTML = score;

    //check lives
    if (lives == 0) {
        spawnHazards = false;
    }
}

function setGoal() {
    goalX = Math.floor(Math.random() * 19) * blockSize;
    goalY = Math.floor(Math.random() * 19) * blockSize;
}

function arrowMove(e) {
    if ((e.key == "ArrowUp" || e.key == "w") && heroY != 0) {
        heroY -= 1 * blockSize;
    }
    else if ((e.key == "ArrowDown" || e.key == "s") && heroY != 19*blockSize) {
        heroY += 1 * blockSize;
    }
    else if ((e.key == "ArrowLeft" || e.key == "a") && heroX != 0) {
        heroX -= 1 * blockSize;
    }
    else if ((e.key == "ArrowRight" || e.key == "d") && heroX != 19*blockSize) {
        heroX += 1 * blockSize;
    }
}

function spawnHazard() {
    // Determine whether to pick a coordinate on the top, bottom, left, or right edge
    const edge = Math.floor(Math.random() * 4);
  
    // Randomly pick a coordinate on the chosen edge
  
    switch (edge) {
      case 0: // Top edge
        hazX = Math.floor((Math.random() * 11) + 5) * blockSize;
        hazY = 0;
        hazDir = "down"
        break;
      case 1: // Bottom edge
        hazX = Math.floor((Math.random() * 11) + 5) * blockSize;
        hazY = 19 * blockSize;
        hazDir = "up"

        break;
      case 2: // Left edge
        hazX = 0;
        hazY = Math.floor((Math.random() * 11) + 5) * blockSize;
        hazDir = "right"

        break;
      case 3: // Right edge
        hazX = 19 * blockSize;
        hazY = Math.floor((Math.random() * 11) + 5) * blockSize;
        hazDir = "left"

        break;
    }
  
    return { hazX, hazY };
  }
  


  function spawn() {
    var hazX = 0;
    var hazY = 0;
    var hazVelocX = 0;
    var hazVelocY = 0;
    var hazDir = "";

    
        // Determine whether to pick a coordinate on the top, bottom, left, or right edge
    const edge = Math.floor(Math.random() * 4);
  
    // Randomly pick a coordinate on the chosen edge
  
    switch (edge) {
      case 0: // Top edge
        hazX = Math.floor((Math.random() * 15) + 3) * blockSize;
        hazY = 0;
        hazDir = "down"
        hazVelocX = 0;
        hazVelocY = 1;
        break;
      case 1: // Bottom edge
        hazX = Math.floor((Math.random() * 15) + 3) * blockSize;
        hazY = 19 * blockSize;
        hazDir = "up"

        hazVelocX = 0;
        hazVelocY = -1;
        break;
      case 2: // Left edge
        hazX = 0;
        hazY = Math.floor((Math.random() * 15) + 3) * blockSize;
        hazDir = "right"

        hazVelocX = 1;
        hazVelocY = 0;
        break;
      case 3: // Right edge
        hazX = 19 * blockSize;
        hazY = Math.floor((Math.random() * 15) + 3) * blockSize;
        hazDir = "left"

        hazVelocX = -1;
        hazVelocY = 0;
        break;
    }
        const newHazard = new Hazard(hazX, hazY, hazVelocX, hazVelocY, hazDir);
        hazards.push(newHazard);
        console.log(hazards);    

  }
  