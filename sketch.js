var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  

}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  spookySound.loop();
   tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImg);
    doorsGroup = new Group();
  climbersGroup = new Group();
  
  invisibleBlockGroup=new Group();
}


function draw(){
  background(0);
  
  if (gameState==="play"){
      if(keyDown("left_arrow")){
    ghost.x = ghost.x-3
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY = -5
  }
  ghost.velocityY = ghost.velocityY+0.8
   if(tower.y>400){
    tower.y=300;
  }
 spawnDoors();
     if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
        }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end";
    }
  }
 

 
    //spawnDoors();
    drawSprites();
  }
  if(gameState==="end"){
    fill("red");
    textSize(30);
    text("GAME OVER",300,300);
  }
 


function spawnDoors() {
  if(frameCount % 240 === 0){
    var door = createSprite(200,-50);
    door.addImage(doorImg);
    
    var climber = createSprite(200,10);
    climber.addImage(climberImg);
    
    door.lifetime = 800;
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    doorsGroup.add(door);
    
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    invisibleBlock.velocityY=1;
    climber.debug=true;
    invisibleBlock.debug=true;
    invisiblelockGroup.add(invisibleBlock);
    
    ghost.depth = door.depth;
    ghost.depth +=1;
  }
}

