var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var player1,pinkCG,player1Image;
var player2,yellowCG,player2Image
var END =0;
var PLAY =1;
var gameState = PLAY;
var bellSound;
var distance=0;
var gameOver,gameOverImg;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  player1Image=loadAnimation("pinkgirl/opponent1.png","pinkgirl/opponent2.png");
  player2Image=loadAnimation("yellowgirl/opponent4.png","yellowgirl/opponent5.png");
  bellSound=loadSound("sound/bell.mp3");
  
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
 gameOver = createSprite(250,150,10,10) ;
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  pinkCG = new Group();
  yellowCG = new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
    
 distance = distance + Math.round(getFrameRate()/60);
    
    //to increase velocity
    path.velocityX = -(6+2*distance/150);
    pinkCyclists.velocityX= -(6+2*distance/150);
    
    if(keyDown("space")){
       bellSound.play();
       }
    
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
   if(mainCyclist.isTouching(pinkCG)||                        
    mainCyclist.isTouching(yellowCG)){
     gameState = END;
   }
    
  
  
var select_oppPlayer= Math.round(random(1,2));
  
 if(frameCount % 150 == 0){
   
   if(select_oppPlayer == 1){
pinkCyclists();
     
 }else{
   yellowCyclists();
 }
   
 }
  }
  
    if(gameState == END){  
    gameOver.visible = true;
      text("Press Up Arrow Key To Restart",150,200)
    path.velocityX=0;
      yellowCG.setVelocityEach(0);
      pinkCG.setVelocityEach(0);
      mainCyclist.changeImage("boy",mainRacerImg1);
      
      if(keyDown("UP_ARROW")){
        reset();
      }
    }
  }
    
function pinkCyclists(){ player1=createSprite(600,Math.round(random(50,350)),10,10)
  player1.velocityX=-6
  player1.addAnimation("g",player1Image)
  player1.scale=0.06
  player1.setLifetime = 170;
  pinkCG.add(player1);
  }
  
  function yellowCyclists(){ player2=createSprite(440,Math.round(random(40,400)),10,10)
  player2.velocityX=-6
  player2.addAnimation("girl",player2Image)
  player2.scale=0.06
  player2.setLifetime = 170;
  yellowCG.add(player2);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  distance = 0;
}


