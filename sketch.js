//creating variables
var trex,trex_running;
var playground,ground_image;
var playground2;
var cloud,cloud_image;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var gameState="begin";
var obstacleGroup;
var cloudgroup;
var score=0;
var jumpSound;
var dieSound;
var checkPointSound;
var gameOver;
var restart;
var gameOverimg;
var restartimg;

//preloading images in a variale
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
ground_image=loadImage("ground2.png");
cloud_image=loadImage("cloud.png");  
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
jumpSound=loadSound("jump.mp3");
dieSound=loadSound("die.mp3");
checkPointSound=loadSound("checkPoint.mp3");
gameOverimg=loadImage("gameOver.png");
restartimg=loadImage("restart.png");
}

//to create a basic setup
function setup(){
createCanvas(windowWidth,windowHeight);

//creating trex sprite
trex=createSprite(40,height-70);
trex.addAnimation("trex_running1",trex_running);
trex.setCollider("circle",0,0,40);

//creating playground sprite
playground=createSprite(70,height-70);
playground.addImage("groundImage1",ground_image);

obstacleGroup=new Group();
cloudGroup=new Group();
  
playground2=createSprite(width/2,height-10,width,125);
playground2.visible=false;

trex.scale=0.5;
  
gameOver=createSprite(width/2,height/2);
gameOver.addImage("gameOver1",gameOverimg);
gameOver.visible=false;
gameOver.scale=0.5;
  
restart=createSprite(width/2,height/2+50);
restart.addImage("restart1",restartimg);
restart.visible=false;
restart.scale=0.5;
}

//execute commands for every frame
function draw(){
background("white");

text("score :  "+score,500,50);
  
if(keyDown("space")&&gameState=="begin"){
gameState="play";
}
  
if(gameState=="play"){

score=score+Math.round(getFrameRate()/50);
var quo=Math.round(score/500);

console.log(quo);
if(quo%2==0){
background("white");
fill("black");
text("score :  "+score,width-100,50);
}

else
  
{
background("black");
fill("white");
text("score :  "+score,width-100,50);
}

//to make trex collide on ground
trex.collide(playground2);
playground.velocityX=-6;
  
//to make trex jump
if(keyDown("space")&&trex.y>=height-120||touches.length>0){
trex.velocityY=-20;
jumpSound.play();
touches=[];
}
  
if(score%100==0 && score>0){
checkPointSound.play();
}

//giving gravity to trex
trex.velocityY=trex.velocityY+1;
  
//to make ground infinet
if(playground.x<0){
playground.x=width/2; 
}

spawnCloud();
spawnobstacle();
}

if(obstacleGroup.isTouching(trex)){
dieSound.play();
gameState="end";
}
  
if(mousePressedOver(restart)){
gameState="begin";
score=0;
restart.visible=false;
gameOver.visible=false;
obstacleGroup.destroyEach();
cloudGroup.destroyEach();
}

  
if(gameState=="end"){
playground.velocityX=0;
trex.velocityX=0;
trex.velocityY=0;
cloudGroup.setVelocityXEach(0);
obstacleGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
cloudGroup.setLifetimeEach(-1);
trex.pause();
dieSound.pause();
restart.visible=true;
gameOver.visible=true;
}

  
//to make sprites displayed 
drawSprites();
}

function spawnCloud(){
if(frameCount%60==0){
cloud=createSprite(580,Math.round(random(250,300)));
cloud.addImage("cloud_image",cloud_image);
cloud.scale=0.5;
cloud.velocityX=-4;
trex.depth=cloud.depth+1;
cloud.lifetime=150;
cloudGroup.add(cloud);
}
}
function spawnobstacle(){
if(frameCount%60==0){
obstacle=createSprite(width,height-90);
switch(Math.round(random(1,6))){
case 1:obstacle.addImage(obstacle1);
break;
case 2:obstacle.addImage(obstacle2);
break;
case 3:obstacle.addImage(obstacle3);
break;
case 4:obstacle.addImage(obstacle4);
break;
case 5:obstacle.addImage(obstacle5);
break;
case 6:obstacle.addImage(obstacle6);
break;
}
obstacle.scale=0.5;
obstacle.velocityX=-6;
obstacle.lifetime=150;
obstacleGroup.add(obstacle);
}
}

