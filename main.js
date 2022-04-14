/*
created by prashant shukla , modified by atharv gupte
*/
//utiliy func's
function setStatus(status){
    document.getElementById("status").innerHTML= "Status:"+status
}
// variables
var paddle2 =10 , paddle1=10;

var paddle1X = 10,paddle1Height = 110;
var paddle2Y = 685,paddle2Height = 70;

var score1 = 0, score2 = 0;
var paddle1Y;

var  playerscore = 0;
var audio1;
var pcscore =0;
//ball x and y and speedx speed y and radius
var ball = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}
var missed = "";
var hit = "";
//loading
function setup(){
  var canvas =  createCanvas(640,800);
  canvas.parent("game_div")
  var camera = createCapture(VIDEO)
  //camera.hide()
  poseNet = ml5.poseNet(camera, modelLoaded);
  poseNet.on('pose',gotPoses);
  missed = loadSound("missed.mp3");
  hit = loadSound("hit.mp3");
}
function modelLoaded(){
      setStatus("model loaded")
      console.info("Model Loaded!")
}
function gotPoses(results){
    console.info("%cI have results","font-size: 10px; margin: 30px 0; padding: 5px 20px; color: #fff; background: linear-gradient(0deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);")
    wristX = results[0].pose.wrist.x ;
    wristY = results[0].pose.wrist.y ;
    circle(wirstX,wristY,25)
}
//onclick func
function start(){
    start = "start";
    console.log("START HAPPENED")
}
function restart(){
    console.log("RESETTING")
    pcscore = 0;
    playerscore = 0;
    navigator.vibrate(100);
    setStatus("resetting...")
    clear();
    setStatus("done!")
    loop();
}
function draw(){
    if(start == "start"){
         setStatus("starting ui draw loop")
         setStatus("drawing");
         background(0); 

         fill("black");
         stroke("black");
         rect(680,0,20,700);

         fill("black");
         stroke("black");
         rect(0,0,20,700);

           //funtion paddleInCanvas call 
           paddleInCanvas();

           //left paddle
           fill(250,0,0);
           stroke(0,0,250);
           strokeWeight(0.5);
           paddle1Y = mouseY; 
           rect(paddle1X,paddle1Y,paddle1,paddle1Height,100);


            //pc computer paddle
            fill("#48cae4");
            stroke("#48cae4");
           var paddle2y =ball.y-paddle2Height/2;  rect(paddle2Y,paddle2Y,paddle2,paddle2Height,100);

            //function midline call
            midline();

            //funtion drawScore call 
           drawScore();
           //function models call  
           //models();
           //function move call which in very important
      move();
            
     setStatus("done with main draw loop")
    }
    else{
        textAlign(CENTER);
        textSize(20);
        fill("white");
        stroke(250,0,0)
        text("Press Start",100,50)
  
    }
}



//function reset when ball does notcame in the contact of padde
function reset(){
   missed.play();
   ball.x = width+100,
   ball.y = height/2+100;
   ball.dx=3;
   ball.dy =3;
   
}


//function midline draw a line in center
function midline(){
    for(i=0;i<480;i+=10) {
    var y = 0;
    fill("white");
    stroke(0);
    rect(width,y+i,10,480);
    }
}


//function drawScore show scores
function drawScore(){
    textAlign(CENTER);
    textSize(20);
    fill("white");
    stroke(250,0,0)
    text("Player:  ",100,50)
    text(playerscore,140,50);
    text("Computer:  ",500,50)
    text(pcscore,555,50)
}
//very important function of this game
function move(){
   fill(50,350,0);
   stroke(255,0,0);
   strokeWeight(0.5);
   ellipse(ball.x,ball.y,ball.r,20)
   ball.x = ball.x + ball.dx;
   ball.y = ball.y + ball.dy;
   if(ball.x+ball.r>width-ball.r/2){
       ball.dx=-ball.dx-0.5;
       hit.play();
   }
  if (ball.x-2.5*ball.r/2< 0){
  if (ball.y >= paddle1Y&& ball.y <= paddle1Y + paddle1Height) {
    ball.dx = -ball.dx+0.5; 
  }
  else{
    pcscore++;
    reset();
    navigator.vibrate(100);
  }
}
if(pcscore == 4){
    fill("#FFA500");
    stroke(0)
    rect(0,0,width,height-1);
    fill("white");
    stroke("white");
    textSize(25)
    text("Game Over!😢😢",width/2,height/2);
    
    text("Press restart to play again !",width/2,height/2+30)
    window.alert("Game Over!😢😢 Press restart To play again !")
    noLoop();
    pcscore = 0;
}
   if(ball.y+ball.r > height || ball.y-ball.r <0){
       ball.dy =- ball.dy;
   }   
}


//width height of canvas speed of ball 
function models(){
    textSize(18);
    fill(255);
    noStroke();
    text("Width:"+width+"\n",135,15);
    text("Speed:"+abs(ball.dx)+"\n",50,15);
    text("Height:"+height,235,15)
}


//this function helps to not go te paddle out of canvas
function paddleInCanvas(){
  if(mouseY+paddle1Height > height){
    mouseY=height-paddle1Height;
  }
  if(mouseY < 0){
    mouseY = 0;
  }  
}
