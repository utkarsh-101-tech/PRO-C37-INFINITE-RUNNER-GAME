 var monkey,monkeyAnime;
 var banana, bananaImg, obs, obsImg;
 var obsGroup, foodGroup;
 var back,backImg, ground
 var score=0;
 var state=1 ;//game state --> 1 is play , 0 is end
 var col=0;   //col is the no. of times the monkey touches the stone

function preload()
{
  //for animation and image
  monkeyAnime=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png") ;
  bananaImg=loadImage("banana.png"); 
  obsImg=loadImage("stone.png");
  backImg=loadImage("jungle.jpg")
  }

function setup() {
  createCanvas(displayWidth,displayHeight);
  //creating ground

  ground=createSprite(displayWidth/2,displayHeight+100,displayWidth,10);
  //ground.visible=false;
  
  //creating obstacle and foods
  obsGroup= new Group();
  foodGroup=new Group();
  
  //background
   back=createSprite(0,200,displayWidth,displayHeight);
  back.addImage("back",backImg);
  back.scale=6;
  
  //creating monkey
  monkey = createSprite(displayWidth/8,displayHeight-250,20,50);
  monkey.addAnimation("anime",monkeyAnime);
  monkey.scale=0.2;
  
}

function draw()
 {
    background(0,0,0);
    monkey.collide(ground);

//gameState is play
    if(state===1){ 
      monkey.velocityY=monkey.velocityY+0.8;
      back.velocityX=-3; 

        if(back.x<0) {             //infinitely scrolling ground
          back.x=back.width/2;
        }
      
      if(keyDown("space")&&monkey.y>200){    //making the monkey jump on space bar
        monkey.velocityY=-16;
       }
  
      if(monkey.isTouching(foodGroup)){  // if monkey touches the food group score is increased 
          score=score+5;  
          if(col===1){                    //if the  no. of times the monkey touches the stone is 1 then it will change to 0
            col=col-1;
          }  
          foodGroup.destroyEach();         //for preventing memory leaks
      }

      switch(score)                               //switch statement for decreasing and increasing size of monkey
      {
        case 10: monkey.scale=0.14;
          break;
        case 20: monkey.scale=0.16;
          break;  
        case 30: monkey.scale=0.18;
          break;  
        case 40: monkey.scale=0.20;
          break; 
        default:break;  
      }
    
      if(monkey.isTouching(obsGroup)){  // if monkey is touching stone col is increased by 1
        col=col+1;
        obsGroup.destroyEach();  //for preventing memory leaks
         if(monkey.scale>0.12){        //condition for scaling down the monkey if it touches the stone
            monkey.scale=monkey.scale-0.02;
          }   
      }   
  
      if(col==2 && state===1){   // if monkey touches the stone twice repeatedly game is over
        state=0;
      }  
      
      obstacle();
      food();
    }
    
    if(state===0){        //game over functionality 
      over();
      back.velocityX=0;  
       if(keyDown("r")){   //reset on press of 'r'
        reset();
       }
  
    }
       camera.position.x=monkey.x;     //camera position
       camera.position.y=monkey.y;
       drawSprites();
      
    stroke("white");                          //text for score
    textSize(20);
    fill("white"); 
    text("Survival Time: "+score,400,50);   
}


function food(){                 //function for creating food at every 130 sec
 if(frameCount%13==0){
   banana = createSprite(displayWidth,displayHeight/4,40,10);
   banana.addImage("banana",bananaImg);
   banana.scale=0.06;
   banana.velocityX=-5;
   banana.lifetime=120;
   foodGroup.add(banana);
 }
}


function obstacle(){               //function for creating stone at every 300 sec
if(frameCount%30==0){
  obs = createSprite(displayWidth,displayHeight-300,10,40);
  obs.addImage("Stone",obsImg);
  obs.scale=0.12;
  obs.velocityX=-6;
  obs.lifetime=100;
  obsGroup.add(obs);
  console.log ("obs")
}  
}

function over(){          //shows game over on screen
  stroke("white"); 
  textSize(20);
  fill("white"); 
  text("GAME OVER",280,150);
  text("Press R to restart",280,170) 
  console.log("over");
}

function reset(){                 //resets the game
  score=0;
  col=0;
  state=1;
}









