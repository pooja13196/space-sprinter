var PLAY = 1;
var END = 0;
var SERVE;
gameState = SERVE;
var bg, astronaut, astronautImg, comet1, cometImg1, comet2, cometImg2, potion, potionImg, mainRocket, mainRocketImg;
var potionS, gameS;
var edges;
var death = 0
var treasureCollection = 0;
var potionGroup, comet1Group, comet2Group;





function preload() {
  bgImg = loadImage("Background.gif");
  astronautImg = loadImage("Astronaut.png");
  cometImg1 = loadImage("01.png");
  cometImg2 = loadImage("02.png");
  potionImg = loadImage("Potion.png");
  mainRocketImg = loadImage("MainRocket.png");
  potionS = loadSound("Potion.wav");
  gameS = loadSound("Gameover.wav");
  start = loadImage("Start.gif")


}

function setup() {
  createCanvas(1650, 850);

  bg = createSprite(width / 2 - 100, height / 2, width / 2, height / 2);
  bg.addImage(bgImg)

  start_sprite = createSprite(800,400,50,50)
  start_sprite.addImage(start)
  start_sprite.visible = false;
  start_sprite.scale=2


  astronaut = createSprite(400, 300, 50, 50);
  astronaut.addImage(astronautImg);
  astronaut.scale = 0.08;

  edges = createEdgeSprites();

  potionGroup = new Group();
  comet1Group = new Group();
  comet2Group = new Group();

}

function draw() {
  //bg("white")


  if (gameState === SERVE) {
    start_sprite.visible = true;
    astronaut.visible= false;
    cometImg1.visible=false;

    if (keyDown("space")) {
      gameState = PLAY;
      astronaut.visible = true;
      start.visible = false;
    }

  }

  if (gameState === PLAY) {
    // moving ground
    bg.velocityX = -3

    start_sprite.visible=false;

    if (bg.x < 0) {
      bg.x = bg.width / 2;
    }




    if (keyDown(UP_ARROW)) {
      astronaut.y = astronaut.y - 1;
    }
    if (keyDown(DOWN_ARROW)) {
      astronaut.y = astronaut.y + 1;
    }
    if (keyDown(LEFT_ARROW)) {
      astronaut.x = astronaut.x - 2;
    }
    if (keyDown(RIGHT_ARROW)) {
      astronaut.x = astronaut.x + 2;
    }


    spawncomet1();
    spawncomet2();
    spawnpotion();
  }
  if (potionGroup.isTouching(astronaut)) {
    potionGroup.destroyEach();
    treasureCollection = treasureCollection + 100;
    potionS.play();
  }
  if (comet1Group.isTouching(astronaut) || comet2Group.isTouching(astronaut)) {
    gameState = END;
    death = death + 1;
    gameS.play();

  }
  else if (gameState === END) {
    bg.velocityX = 0;
    astronaut.visible = false
    comet1Group.destroyEach();
    comet2Group.destroyEach();
    potionGroup.destroyEach();
    comet1Group.setLifetimeEach(0);
    comet2Group.setLifetimeEach(0);
    potionGroup.setLifetimeEach(0)

    if (keyDown("R")) {
      reset();
    }
  }

  astronaut.collide(edges);
  drawSprites();
  stroke("orange");
  fill("white");
  textSize(10);
  text("YOU DIED:" + death, 1000, 50);
  stroke("gold");
  fill("white");
  textSize(10);
  text("YOU GOT:" + treasureCollection, 1000, 40);

}

function reset() {
  gameState = PLAY;
  astronaut.visible = true
  start.visible = true;
  potionGroup.destroyEach();
  comet1Group.destroyEach();
  comet2Group.destroyEach();

  death = 0;
  treasureCollection = 0

}
function spawncomet1() {
  if (frameCount % 70 === 0) {
    var comet1 = createSprite(1200, 120, 20, 20);

    comet1.velocityX = -5;
    comet1.y = Math.round(random(10, 240));
    comet1.addImage(cometImg1);
    comet1.scale = 0.15;
    comet1.lifetime = 300;
    comet1Group.add(comet1)
  }

}

function spawncomet2() {
  if (frameCount % 30 === 0) {
    var comet2 = createSprite(0, 120, 20, 20);

    comet2.velocityY = 5;
    comet2.x = Math.round(random(10, 1100))
    comet2.y = Math.round(random(10, 240));
    comet2.addImage(cometImg2);
    comet2.scale = 0.5;
    comet2.lifetime = 300;

    comet2Group.add(comet2)
  }
}

function spawnpotion() {
  if (frameCount % 60 === 0) {
    var potion = createSprite(0, 120, 20, 20);

    //potion.velocityY = 5;
    potion.x = Math.round(random(10, 1100))
    potion.addImage(potionImg);
    potion.scale = 0.15;
    potion.lifetime = 300;

    potionGroup.add(potion)
  }
}


