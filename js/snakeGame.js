const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

const board = new Image();
board.src = "img/board.png"


 const carrot = new Image();
 carrot.src = "img/carrot.png" 

 let score = 0;
 let box = 32;
 let food = {
     x: Math.floor((Math.random() * 17 + 1 )) * box,
     y:Math.floor((Math.random() * 15 + 3 )) * box
 };

 let snake = [];
 snake[0] = {
     x:9 * box,
     y:10 * box
 };

 document.addEventListener("keydown", direction);

let dir;

 function direction(event){
    if(event.keyCode == 37 && dir != 'right')
            dir = "left";
        else if(event.keyCode == 38 && dir != 'down')
             dir = "up";
        else if(event.keyCode == 39 && dir != 'left')
             dir = "right";
        else if(event.keyCode == 40 && dir != 'up') 
                dir = "down";
    
 }

 function eatTale(head,tale) {
     for(let i = 0 ; i<tale.length; i++){
        if(head.x == tale[i].x && head.y == tale[i].y)
        clearInterval(game)
     }
 }

 function drawGame(){
     context.drawImage(board, 0, 0)
     context.drawImage(carrot, food.x ,food.y);
     
     for (let i = 0; i<snake.length; i++){
         context.fillStyle = i == 0 ? "red" : "black";
         context.fillRect(snake[i].x, snake[i].y, box,box);
     }
     context.fillStyle = "white";
     context.font = "50px Arial";
     context.fillText(score , box *2.5, box*1.7)

     let snakeX = snake[0].x;
     let snakeY = snake[0].y;

     if (snakeX == food.x && snakeY == food.y){
         score++;
          food = {
            x: Math.floor((Math.random() * 17 + 1 )) * box,
            y:Math.floor((Math.random() * 15 + 3 )) * box
        };

     }else{
         snake.pop();
     }

     if(snakeX<box || snakeY > box*17
        ||snakeY <3*box || snakeY >box*17)
        clearInterval(game)


     if(dir == "left") snakeX -= box;
     if(dir == "right") snakeX += box;
     if(dir == "up") snakeY -= box;
     if(dir == "down") snakeY += box;

     let newHead = {
         x: snakeX,
         y: snakeY
     }

     eatTale(newHead,snake)
     snake.unshift(newHead)

 }

 let game = setInterval(drawGame,100)

