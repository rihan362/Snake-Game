let inputDir={x:0,y:0};
let speed=5;
let score=0;
let lastpaintime=0;
let snakeArr=[
    { x: 13,y:15}
]
 food=
    { x:10,y:5 };


// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime-lastpaintime)/1000<1/speed)
    {
        return;
    }
    lastpaintime=ctime;
    gamengine();
    // console.log(ctime);
}




function iscollided(snake)
{
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snake[i].x==snake[0].x&&snake[i].y==snake[0].y)
        {
            return true;
        }
    }
    if(snake[0].x>=18||snake[0].x<=0 || snake[0].y>=18||snake[0].y<=0)
    {
        return true;
    }
    
}




function gamengine()
{
     if(iscollided(snakeArr))
     {
        inputDir={x:0,y:0};
        alert("Game Over");
        snakeArr={x:13,y:14};
        score=0;
     }
    


    //  after eating thhe food\

    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x)
    {
      snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y:snakeArr[0].y+ inputDir.y})
      score+=1;
      if(score>highscoreval)
      {
        highscoreval=score;
        localStorage.setItem("hiscore",JSON.stringify(highscoreval));
        highscorebox.innerHTML="HIgh sCore :" + highscoreval;
      }
      scorebox.innerHTML="Score : " + score
      let a=2;
      let b=16;
      food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }


    // Moving the snake
    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].y +=inputDir.y;
    snakeArr[0].x +=inputDir.x;





    // display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0)
        {
        snakeElement.classList.add('head');
        }
       else
       {
        snakeElement.classList.add('snake');
       }

        board.appendChild(snakeElement);
        
    } );
    

//   display food

    foodElement=document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    board.appendChild(foodElement);

}






let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    highscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(highscoreval));
}
else
{
    highscoreval=JSON.parse(hiscore);
    highscorebox.innerHTML="HIGHsCORE "+ hiscore;
}




// game logiic

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};
    switch (e.key) {
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;


    }
})