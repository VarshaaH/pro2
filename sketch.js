var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var honey
var invisibleBlockGroup, invisibleBlock;
var gameOver
var restart
var gameState = "play"
var score =0

function preload(){
 // towerImg = loadImage("tower.png");
  platformImg = loadImage("vineyPlatform.png");
  mushroomImg = loadImage("snek.png");
  //bugStandingImg = loadImage("bugStanding.png");
  bugJumpingImg = loadAnimation("fly.png");
  happyImg = loadAnimation('happyBug.png')
  Bg_music = loadSound("Cozy-Fireplace.mp3");
  bg_img = loadImage('forest.jpg')
  leafImage = loadImage('leaves.png')
  flowerImage =loadImage('Flower.png')
  heartImage = loadImage('Heart.png')
 gameOverImage = loadImage('gameOver.png')
 snakeSound = loadSound('snake-hissing-6092.mp3')
 honeyImg  = loadImage('honey.png')
 restartImg = loadImage('restart.png')
}

function setup() {

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 
  if(isMobile)
  { 
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight); 
  } else 
  { canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight); 
  }

  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;

  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale = 0.5;

  platformsGroup = new Group()
  mushroomsGroup = new Group()
  invisibleBlockGroup = new Group()
  flowersGroup = new Group()

   bug = createSprite(200,200,50,50)
  bug.addAnimation(bugJumpingImg)
  bug.scale = 0.4

  bug.debug = true
  
honeyBottle = createSprite(1200,55,50,50)
honeyBottle.addImage(honeyImg)
honeyBottle.scale = 0.2

  Bg_music.loop()
}

function draw() {
  background(bg_img);
  text(mouseX+','+mouseY,mouseX,mouseY)
  textSize(40)
  //textFamily(fantasy)
  fill('black')
  text('score:'+score,54,50)

  


  if (gameState==='play'){

 gameOver.visible = false;
    restart.visible = false
    if (flowersGroup.isTouching(bug)){
      snakeSound.play()
      score = score+5
      bug.changeAnimation('happy',happyImg)
      
      flowersGroup[0].destroy()
   
    }

  /*if(tower.y > 400){
      tower.y = 300
  
    }*/
    if(keyDown('right_arrow')){
      bug.x = bug.x + 2;
    }
    if(keyDown('left_arrow')){
      bug.x = bug.x - 2;
    }
    if(keyDown('space')){
      bug.velocityY = -5;
    bug.changeAnimation(bugJumpingImg)

    }

    
if (mushroomsGroup.isTouching(bug) || bug.y>canH ){

  bug.destroy()
  gameState = 'end'
 restart.visible = true

  
}

    bug.velocityY = bug.velocityY+0.8  

    bug.collide(invisibleBlockGroup)
    SpawnPlatforms() 
    spawnLeaves()
    drawSprites()
    
  }

  
  if (gameState==='end'){
    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)) {
      reset();

    /*stroke('yellow')
    fill('yellow') 
    textSize(30) 
    
    text('Game Over',230,250)*/
    
    }
  }
}

function SpawnPlatforms() {
if (frameCount%100===0){
  platform = createSprite(100,-50)
  platform.velocityY = 1
  platform.addImage(platformImg)
  platform.x = Math.round(random(0,canW))
  platform.lifetime = 800
  platform.scale =0.5
  platformsGroup.add(platform)
  platform.debug = true
  platform.setCollider('rectangle',0,0,40,40)
  
  

  var mushroom = createSprite(100,115,10,20)
  mushroom.velocityY = 1
  mushroom.x = platform.x
  mushroom.y =platform.y+110
  mushroom.scale = 0.3
mushroom.lifetime = 800
mushroom.addImage(mushroomImg)
  mushroomsGroup.add(mushroom)
  mushroom.debug = true

  var flower = createSprite(100,115,10,20)
  flower.velocityY = 1
  flower.x = platform.x
  flower.y =platform.y-100
  flower.scale = 0.2
flower.lifetime = 800
flower.addImage(flowerImage)
 flowersGroup.add(flower)
  flower.debug = true

  



  var invisibleBlock = createSprite(400,15)
  invisibleBlock.velocityY = 1
  invisibleBlock.x = platform.x
  invisibleBlock.y = platform.y-40
  invisibleBlock.width = platform.width-200
  invisibleBlock.height = 3
  invisibleBlock.lifetime = 800
  invisibleBlock.visible = false
  invisibleBlockGroup.add(invisibleBlock)

 

  bug.depth = platform.depth
  bug.depth += 1

}


}

function spawnLeaves(){

  // write your code here 
  if(frameCount % 50 === 0){
 
  
  leaf = createSprite(600,100,40,10)
  leaf.addImage(leafImage)
  leaf.scale=0.2
  leaf.velocityY=2
  leaf.x=Math.round(random(0,canW))
  leaf.lifetime=800

 
 }}

 function reset(){

  gameState = PLAY
flowersGroup.destroyEach()
platformsGroup.destroyEach()
//trex.changeAnimation ('running',trex_running)
score = 0
}

//gameOver - styling 
//restart icon
//restart functoin 
//animation for bug
//goodImages (restart,gamOver)
//scoreImage as honey bottle image :scorevalue
//addSounds(hissing,happy,gameover,bgmusic)
