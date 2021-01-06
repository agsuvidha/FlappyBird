//Creating variables for sprites.
var topPipe,bottomPipe,gameOver,restart;
var topPipeGroup,bottomPipeGroup;
var food,foodGroup;
var back;

//Creating variables for gamestates.
var PLAY = 0;
var END = 1;
var START=2;
var gameState = START;
var pipeSpeed=-4;

//Creating variable for score.
var score=0;

function preload(){

  //Loading images in variables.
  bg=loadImage("images/back.gif");
  birdImg=loadImage("images/bird.png");
  pipeUp=loadImage("images/pipeNorth.png");
  pipeDown=loadImage("images/pipeSouth.png");
  resetImg=loadImage("images/restart.png");
  gameOverImg=loadImage("images/gameOver.png");
  startBg=loadImage("images/back2.png");


  //Loading sounds.
  wingSound=loadSound("images/wing.mp3");
  endSound=loadSound("images/hit.mp3");
  foodImg=loadImage("images/food.png");
}

function setup() {
  createCanvas(displayWidth-50,displayHeight-90);
 
  //Creating background.
  back=createSprite(0,0,displayWidth*5,displayHeight);
  back.addImage(bg);
  back.scale=7;

  //Creating bird.
  bird=createSprite(displayWidth/2-100,displayHeight/2);
  bird.addImage(birdImg);

  

  //Creating restart button.
  restart=createSprite(displayWidth/2,displayHeight/2+45);
  restart.addImage("restart",resetImg);
  restart.visible=false;
  restart.scale=0.4

  //Writing gameover.
  gameOver=createSprite(displayWidth/2-250,displayHeight/2);
  gameOver.addImage("gameover",gameOverImg);
  gameOver.visible=false;
 

  //Creating invisible ground.
  ground=createSprite(displayWidth/2,displayHeight-100,10000,10);
  ground.visible=false;

  //Creating groups.
 topPipeGroup=new Group();
 bottomPipeGroup=new Group();
 foodGroup=new Group();

 textSize(30);
 textFont("Algerian");
 fill("red");
 stroke("cyan")

}



function draw() {
  //Gamestate Play.
  if(gameState===START)
  {
    background(startBg);
    back.visible=false;
    bird.visible=false;
    var heading=createElement('h1');
    heading.html("Flappy Bird");
    heading.position(displayWidth/2-100,100);
    var button=createButton("Play");
    button.position(displayWidth/2,displayHeight/2);
    button.mousePressed(()=>{
      removeElements();
      gameState=PLAY;
    })
  }


  if(gameState===PLAY){
    back.visible=true;
    bird.visible=true;
    
  //Moving background.
  back.velocityX=-2;

  

  //Moving bird if space key is pressed.
  if(keyDown("space")){
    bird.velocityY=-10;
    wingSound.play();
    
  }

  //Making the bird fall down if space key is not pressed for long.
  bird.velocityY=bird.velocityY+1;

  //Infinite background effect
  if(back.x<0){
   back.x=back.width/2
  }

  

  //Calling functions.
  spawnObstacles();
  scoring();

  
  //Giving extra score if bird touches the food.
  if(foodGroup.isTouching(bird)){
    for(var k=0;k<foodGroup.length;k++){
      if(foodGroup[k].isTouching(bird)){
    score=score+1;

    //Destroying the food.
    foodGroup[k].destroy();
  }
}
}
  
  //Ending the game if bird falls down or touches the pipe.
  if(topPipeGroup.isTouching(bird)|| bottomPipeGroup.isTouching(bird)||bird.isTouching(ground)){
     gameState=END;
    endSound.play();
  }
  drawSprites();
  text("Score: "+score,displayWidth-200,100);

}

//Gamestate End.
if(gameState===END){

  

  //Stopping the things from moving.
  topPipeGroup.setVelocityXEach(0);
  bottomPipeGroup.setVelocityXEach(0);
  foodGroup.setVelocityXEach(0);
  back.velocityX=0;

  //Making gameover and restart button visible to player.
  gameOver.visible=true;
  restart.visible=true;
  
  //Setting the lifetime to infinite so they don't vanish.
  topPipeGroup.setLifetimeEach(-1);
  bottomPipeGroup.setLifetimeEach(-1);
  foodGroup.setLifetimeEach(-1);
  bird.velocityY=0;

  //Calling restart function if restart button is pressed.
  if(mousePressedOver(restart)) {
    reset();
  }
  drawSprites();
  text("Score: "+score,displayWidth-200,100);

 
}

}

//Function for obstacles(pipes).
function spawnObstacles(){
  //Creating pipes at a specific time.
  //if(frameCount%120===0){
  if((topPipeGroup.length===0)||(topPipe.x<displayWidth-420))
  {
    //Creating a variable for pipes to come at random heights.
    var randomHeight=random(80,350);

    //Creating the top pipe at random heights.
   topPipe=createSprite(displayWidth-100,randomHeight-190);
   topPipe.addImage(pipeUp);
   //console.log(topPipe.x);
  
  //Giving the top pipe its velocity.
  //topPipe.velocityX=-2;
  topPipe.velocityX = pipeSpeed;
  
  //Creating the bottom pipe at random heights.
    bottomPipe=createSprite(displayWidth-100,displayHeight-180+(randomHeight-190));
  bottomPipe.addImage(pipeDown);
  //Giving the bottom pipe its velocity.
//bottomPipe.velocityX=-2;
bottomPipe.velocityX =topPipe.velocityY;

//Giving pipes lifetime.
topPipe.lifetime=displayWidth/2;
bottomPipe.lifetime=displayWidth/2;

topPipe.depth=gameOver.depth;
gameOver.depth=restart.depth;
restart.depth=restart.depth+1;

bottomPipe.depth=gameOver.depth;
gameOver.depth=restart.depth;
restart.depth=restart.depth+1;

//Creating food in between pipes at random positions.
if(Math.round(random(1,6))%2===0){
var food=createSprite(displayWidth-100,randomHeight+random(20,170));
food.addImage(foodImg);
food.scale=0.2;
food.velocityX=topPipe.velocityX;

//Adding food in the food group.
foodGroup.add(food);}

//Adding pipes in their groups.
}
topPipeGroup.add(topPipe);
bottomPipeGroup.add(bottomPipe);

}
//Reset function.
function reset(){
  gameState=PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
   topPipeGroup.destroyEach();
   bottomPipeGroup.destroyEach();
   foodGroup.destroyEach();
  
   bird.x=displayWidth/2-100;
   bird.y=displayHeight/2;

   score=0;
   pipespeed=-4;
}

//Creating a scoring function.
function scoring(){
 for(var i=0;i<topPipeGroup.length;i++){
   if(bird.x-topPipeGroup[i].x<=4&&bird.x-topPipeGroup[i].x>4+pipeSpeed){

    //Increasing score by 1 if bird travels in between the pipes.
     score=score+1;
   }
   if(score%2===0)
   {
     pipeSpeed=-2;
     topPipeGroup.setVelocityXEach(pipeSpeed);
     bottomPipeGroup.setVelocityXEach(pipeSpeed);
     
   }
 }
}


