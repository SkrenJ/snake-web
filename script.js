// JavaScript code from your previous script.js
let snake = [[5, 5], [5, 6], [5, 7]];
let direction = "right";
let food = null;
let foodEaten = false;
let dx = 1; 
let dy = 0; 
var aua = 12;
let gameLoopTimeout;
let tickSpeed = 210;
let isPaused = false;

function initBoard() {
    var table = document.getElementById("game-board");
    for (let i = 0; i < aua; i++) {
        var row = table.insertRow(i);
        for (let j = 0; j < aua; j++) {
            var cell = row.insertCell(j);
        }
    }
}

function startGame() {
    if (!isPaused) {
        renderSnake();
        gameLoopTimeout = setTimeout(gameLoop, tickSpeed);
    } else {
        isPaused = false;
        gameLoopTimeout = setTimeout(gameLoop, tickSpeed);
    }
}

function pauseGame() {
    clearTimeout(gameLoopTimeout);
    isPaused = true;
}

function restartGame() {
    clearTimeout(gameLoopTimeout);
    snake = [[5, 5], [5, 6], [5, 7]];
    direction = "right";
    dx = 1;
    dy = 0;
    foodEaten = false;
    tickSpeed = 210;
    clearBoard();
    generateFood();
    startGame();
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== "down") direction = "up";
            break;
        case "ArrowDown":
            if (direction !== "up") direction = "down";
            break;
        case "ArrowLeft":
            if (direction !== "right") direction = "left";
            break;
        case "ArrowRight":
            if (direction !== "left") direction = "right";
            break;
    }
});

function renderSnake() {
    for (let i = 0; i < snake.length; i++) {
        let x = snake[i][0];
        let y = snake[i][1];
        let cell = document.getElementById("game-board").rows[y].cells[x];
        cell.classList.add("snake-body")
    }
}

function gameLoop() {
    update();
    render();
    if (!isPaused) {
        gameLoopTimeout = setTimeout(gameLoop, tickSpeed);
    }
}

function update() {
    switch (direction) {
        case "up":
            dx = 0;
            dy = -1;
            break;
        case "down":
            dx = 0;
            dy = 1;
            break;
        case "left":
            dx = -1;
            dy = 0;
            break;
        case "right":
            dx = 1;
            dy = 0;
            break;
    }

    let newHead = [snake[0][0] + dx, snake[0][1] + dy];

    snake.unshift(newHead);

    if (checkCollision()) {
        gameOver();
        return;
    }

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
        foodEaten = true;
        generateFood();
    } 

    if (!foodEaten) {
        snake.pop(); 
    } else {
        foodEaten = false;
    }
}

function render() {
    clearBoard();
    renderSnake();
    renderFood();
}

function clearBoard() {
    let table = document.getElementById("game-board");
    for (let i = 0; i < aua; i++) {
        for (let j = 0; j < aua; j++) {
            table.rows[i].cells[j].className = "";
        }
    }
}

function checkCollision() {
    let head = snake[0];
    if (head[0] < 0 || head[0] >= aua || head[1] < 0 || head[1] >= aua) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
            return true;
        }
    }
    return false;
}

function generateFood() {
    food = [
        Math.floor(Math.random() * aua),
        Math.floor(Math.random() * aua)
    ];
}

function renderFood() {
    if (food) {
        let cell = document.getElementById("game-board").rows[food[1]].cells[food[0]];
        cell.classList.add("food");
    }
}

function gameOver() {
    clearTimeout(gameLoopTimeout);
    clearBoard();
    snake = [[5, 5], [5, 6], [5, 7]];
    direction = "right";
    dx = 1;
    dy = 0;
    foodEaten = false;
    tickSpeed = 210;
    generateFood();
    gameLoopTimeout = setTimeout(gameLoop, tickSpeed);
}

window.onload = function() {
    initBoard();
    generateFood();
};