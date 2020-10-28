// define variables
var monkey , monkeyRunningAnimation
var banana , bananaImage, bananaGroup
var obstacle, obstacleImage, obstacleGroup
var ground
var survivalTime

function preload()
{
    // load images and animations
    monkeyRunningAnimation = loadAnimation("sprite_0.png",
    "sprite_1.png", "sprite_2.png", "sprite_3.png", 
    "sprite_4.png", "sprite_5.png", "sprite_6.png",
    "sprite_7.png", "sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
}

function setup()
{
    // create monkey sprite with animation
    monkey = createSprite(80, 315, 10, 10);
    monkey.addAnimation("moving", monkeyRunningAnimation);
    monkey.scale = 0.1;

    // create ground sprite and position in centre
    ground = createSprite(400, 395, 800, 10);
    ground.x = ground.width / 2;
    // give velocityX
    ground.velocityX = -5;

    // create groups
    bananaGroup = new Group();
    obstacleGroup = new Group();

    // start score as 0
    score = 0;
}


function draw()
{
    // create canvas
    createCanvas(400, 400);
    background("brown")

    // reset ground
    if(ground.x < 0)
      {
          ground.x = ground.width/2;
      }

    // gravity
    monkey.velocityY += 1;
    monkey.collide(ground);
    // to jump
    if(monkey.y > 359 && keyWentDown("space"))
      {
          monkey.velocityY = -14;
      }

    // spawn bananas and obstacles
    spawnFood();
    spawnObstacles();

    // draw sprites
    drawSprites();

    // increase score every 3 frames
    if(frameCount % 5 === 0)
      {
          score++;
      }
    // display score
    textSize(15);
    text("score: " + score, 325, 30);
}

function spawnFood()
{
    // every 80 frames
    if(frameCount % 80 === 0)
      {
          // create sprite with random y and image
          randBananaY = Math.round(random(120, 200));
          banana = createSprite(400, randBananaY, 10, 10);
          banana.addImage("bananaImage", bananaImage);
          banana.scale = 0.1;
          // give velocityX and lifetime
          banana.velocityX = -3;
          banana.lifetime = 145;
          // add to group
          bananaGroup.add(banana);
      }
}

function spawnObstacles()
{
    // every 80 frames
    if(frameCount % 80 === 0)
      {
          // create sprite with image
          obstacle = createSprite(400, 375, 10, 10);
          obstacle.addImage("obstacleImage", obstacleImage);
          obstacle.scale = 0.1;
          // give velocityX and lifetime
          obstacle.velocityX = -5;
          obstacle.lifetime = 85;
          // add to group
          obstacleGroup.add(obstacle);
      }
}




