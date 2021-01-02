var topPipe,bottomPipe;

function preload(){
  bg=loadImage("images/bg.png");
  birdImg=loadImage("images/bird.png");
  pipeUp=loadImage("images/pipeNorth.png");
  pipeDown=loadImage("images/pipeSouth.png");
  pipeLine=loadImage("images/pipeLines.png");
}

function setup() {
  createCanvas(displayWidth-50,displayHeight-90);
  background(bg);

  

  //background=createSprite(displayWidth*2,displayHeight);
 // background.addImage(bg);
 // background.scale=4
 // background.x=background.width*3
 // background.velocityX=-4;

  bird=createSprite(displayWidth/2-100,displayHeight/2);
  bird.addImage(birdImg);

  console.log(displayHeight);

}



function draw() {
  background(bg); 
  
 //bg.velocityX=-3;

  if(keyDown("space")){
    bird.velocityY=-5;
  }
  bird.velocityY=bird.velocityY+2;

  if(background.x<0){
   background.x=background.width/2
  }
  spawnObstacles();

  drawSprites();
}
function spawnObstacles(){
  if(frameCount%60==0){
    var randhgt=random(80,350);
  var topPipe=createSprite(displayWidth-20,randhgt-190);
  //var topPipe2=createSprite(topPipe.x,0,50,200);
  //image(pipeUp,50,50,50,50);
  topPipe.addImage(pipeUp);
  //topPipe2.addImage(pipeLine);
  //top
  //image(pipeUp,,0,random(100,200));
  //var topRand=random(100,200);
  //topPipe.y=topRand;
  // console.log(topPipe.height);
  //topPipe.height=topRand;
  topPipe.velocityX=-2;
  //topPipe2.velocityX=topPipe.velocityX;
  
    
  var bottomPipe=createSprite(displayWidth-20,displayHeight-180+(randhgt-190));
  bottomPipe.addImage(pipeDown);
  //var bottomRand=Math.round(random)
bottomPipe.velocityX=-2;
}

}