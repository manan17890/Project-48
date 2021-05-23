var PLAY = 1;
var END = 0;
var gameState = PLAY;

var terminator , terminator_image ;
var ground, invisibleGround,invisibleGround2, groundImage , ground2 ;
var bullet , bullet_image , bulletGroup;
var zombieGroup1, zombieGroup2 , zombie1_running , zombie2_running , zombie1 , zombie2;
var score ;
var gameover , gameend;
var restart , restarticon;

function preload(){
  zombie1_running = loadAnimation("images/zombie1/Walk1.png","images/zombie1/Walk2.png","images/zombie1/Walk3.png","images/zombie1/Walk4.png","images/zombie1/Walk5.png","images/zombie1/Walk6.png");
  zombie2_running = loadAnimation("images/zombie2/Walk1.png","images/zombie2/Walk2.png","images/zombie2/Walk3.png","images/zombie2/Walk4.png","images/zombie2/Walk5.png","images/zombie2/Walk6.png");
  groundImage = loadImage("images/game/background.jpg");
  gameend = loadImage("images/game/gameOver.png");
  restarticon = loadImage("images/game/restart.png");
  bullet_image = loadImage("images/game/bullet.png")
  terminator_image = loadImage("images/game/terminator.png")
  floating_land = loadImage("images/game/floating-land.jpg")
}

function setup() {
  createCanvas(800,400);

  terminator = createSprite(50,340,20,50);
  terminator.addAnimation("running", terminator_image);
  terminator.scale = 0.3;

  gameover = createSprite(400 , 130 , 50 , 50);
  gameover.addImage("over",gameend);
  gameover.scale=1.2 ;
  gameover.visible=false;

  restart = createSprite( 400 , 220 , 20 , 20);
  restart.addImage("playagain", restarticon);
  restart.scale=0.5;
  restart.visible=false;

  invisibleGround = createSprite(380,390,900,10);
  invisibleGround.visible = false;  
 
  invisibleGround2 = createSprite(10,350,10,250);
  invisibleGround2.visible = false;  
  
  zombieGroup1 = createGroup();
  zombieGroup2 = createGroup();
  bulletGroup = createGroup();
  
  score = 0;

}

function draw() {
  background(groundImage);
  
  textSize(15)
  fill("black")
  text("Press 'ENTER' key to shoot bullet" , 10 , 20)
  text("Use Arrow keys to move", 10 , 40)

  stroke(0)
  textSize(20)
  fill("black");
  text("Score: "+ score, 700,40);


  

  if (gameState==PLAY){
      
    
    spawnzombie1();
    spawnzombie2();
    terminator.collide(invisibleGround);
    terminator.collide(invisibleGround2);
    terminator.visible = true;
    
  if (keyDown("enter")) {
    createBullet();
    }
  if (keyDown("RIGHT_ARROW")) {
      terminator.x = terminator.x + 5
    } 
  if (keyDown("LEFT_ARROW")) {
    terminator.x = terminator.x - 5
    }    

    
    if(keyDown("UP_ARROW")&& terminator.y >= 330) {
      terminator.velocityY = -13;
  }

  terminator.velocityY = terminator.velocityY + 0.8
  

  if(bulletGroup.isTouching(zombieGroup1)){
    zombieGroup1.destroyEach();
    bulletGroup.destroyEach();
    score=score+1;
  }
    if(bulletGroup.isTouching(zombieGroup2)){
    zombieGroup2.destroyEach();
    bulletGroup.destroyEach();
    score=score+3;
    }
    
   
  gameover.visible=false;
  restart.visible=false;   
  if((terminator.isTouching(zombieGroup1))|| terminator.isTouching(zombieGroup2)){
    gameState = END;
}
  
  
  
 
 
  }
  
  else if (gameState === END) {
     
    zombieGroup1.setVelocityXEach(0);
    zombieGroup2.setVelocityXEach(0);
  
    terminator.x= 50;
    terminator.y= 340;

    gameover.lifetime = 20000
    restart.lifetime = 10000
    zombieGroup1.setLifetimeEach(-1);
    zombieGroup2.setLifetimeEach(-1);
    gameover.visible=true;
    restart.visible=true;
    if (mousePressedOver(restart)){
       
      reset();
   
    }
    
     }
   
  
  drawSprites();
}

function reset(){
  
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  zombieGroup1.destroyEach();
  zombieGroup2.destroyEach();
  score = 0;

  
}
function spawnzombie1() {
   if (frameCount % 170 === 0) {
     zombie1 = createSprite(820,340,40,10);
    zombie1.y = Math.round(random(340,345));
    zombie1.addAnimation("running",zombie1_running);
    zombie1.scale = 0.2;
    zombie1.velocityX = -1.2;
    zombie1.collide(invisibleGround);
  
     //assign lifetime to the variable
    zombie1.lifetime = 730;
    
    //adjust the depth
    zombie1.depth = terminator.depth;
    terminator.depth = terminator.depth + 1;
    
   zombieGroup1.add(zombie1);
    }
}
function spawnzombie2() {
  if (frameCount % 140 === 0) {
    zombie2 = createSprite(790,340,40,10);
   zombie2.y = Math.round(random(340,345));
   zombie2.addAnimation("running",zombie2_running);
   zombie2.scale = 0.2;
   zombie2.velocityX = -1.2;
   zombie2.collide(invisibleGround);
 
    //assign lifetime to the variable
   zombie2.lifetime = 730;
   
   //adjust the depth
   zombie2.depth = terminator.depth;
   terminator.depth = terminator.depth + 1;
   zombieGroup2.add(zombie2);
   }
  }

function createBullet() {
  var bullet= createSprite(100, 100, 60, 10);
  bullet.addImage(bullet_image);
  bullet.x = terminator.x + 39
  bullet.y=terminator.y;
  bullet.velocityX = +4;
  bullet.lifetime = 700;
  bullet.scale = 0.1;
  bulletGroup.add(bullet);
   
}