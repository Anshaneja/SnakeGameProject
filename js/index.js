// Game constants and variables
let inputDir = { x:0 , y:0};
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
let score = 0;
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [ 
    { x:5 , y:13},
];
let food= { x:10, y:7};
1// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArr){
    if(snakeArr[0].x >= 21 || snakeArr[0].x <=0 ||snakeArr[0].y >= 21 || snakeArr[0].y <=0 ){
        return true;
    }
    for(let i = 1;i<snakeArr.length;i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    return false;
}

function gameEngine(){
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir = { x:0, y:0};
        alert("Game Over! Press any key to continue");
        snakeArr = [ { x:5 , y:13} ];
        score = 0;
        document.getElementById("score").innerHTML = score;
        
    }


    // if snake ate the food, we initialize food to a random place
    if( snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        snakeArr.unshift( { x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 15;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        score += 1;
        document.getElementById("score").innerHTML = score;
    } 

    // move snake
    for(let i = snakeArr.length -2; i>=0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y; 

    // 1) Update the snake & food
    // 2) Dispaly snake and food

    board.innerHTML = "";
    //display snake
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

// main logic starts here

window.requestAnimationFrame(main);
window.addEventListener('keydown',e => {
    moveSound.play();
    switch(e.key){
        case 'ArrowUp':
            console.log('ArrowUp');
            if(snakeArr.length > 1 && inputDir.x === 0 && inputDir.y === 1 ){
                break;
            }
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case 'ArrowDown':
            console.log('ArrowDown');
            if(snakeArr.length > 1 && inputDir.x === 0 && inputDir.y === -1 ){
                break;
            }
            inputDir.x = 0;
            inputDir.y = 1;
            break;
            
        case 'ArrowLeft':
            console.log('ArrowLeft');
            if(snakeArr.length > 1 && inputDir.x === 1 && inputDir.y === 0 ){
                break;
            }
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case 'ArrowRight':
            console.log('ArrowRight');
            if(snakeArr.length > 1 && inputDir.x === -1 && inputDir.y === 0 ){
                break;
            }
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})