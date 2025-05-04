//import { GameData } from './GameData.js';
class round3 extends Phaser.Scene {
    constructor() {
        super("round3");

        // Initialize a class variable "my" which is an object.
        // The object has one property, "sprite" which is also an object.
        // This will be used to hold bindings (pointers) to created sprites.
        this.my = {sprite: {}, text: {}};   

        // Create a flag to determine if the "bullet" is currently active and moving
        // Create a property inside "sprite" named "bullet".
        // The bullet property has a value which is an array.
        // This array will hold bindings (pointers) to bullet sprites

    }

    preload() {
        this.load.setPath("./assets/");

        this.load.atlasXML("objectParts", "spritesheet_objects.png", "spritesheet_objects.xml");
        this.load.atlasXML("hudParts", "spritesheet_hud.png", "spritesheet_hud.xml");
        this.load.atlasXML("stallParts", "spritesheet_stall.png", "spritesheet_stall.xml");

        this.load.audio("impact", "impactMetal_heavy_003.ogg");

    }

    create() {
        let my = this.my;

        this.bulletsFired = 0;
        this.fireDelayActive = false;
        this.fireResetDelay = 1000;     // in milliseconds (1 second)


        this.my.sprite.bullet = [];   
;        // Number of update() calls to wait before making a new bullet
        this.bulletCooldownCounter = 0;

        this.my.sprite.water = [];
        this.my.sprite.waterLeft = [];
        //create different arrays for different levels 

        this.my.sprite.ducks3 = [];
        this.my.sprite.sticks3 = [];

        this.verticalAmplitude = 30; // how far up/down ducks move
        this.verticalFrequency = 0.05; // how fast the wave goes
        this.maxBullets = 3;           // Don't create more than this many bullets
        this.bulletCooldown = 20

        this.myScore = this.registry.get('myScore') || 0;
        this.remainingTime = this.registry.get('remainingTime') || 0;

        //create a background first
        my.sprite.background1 = this.add.sprite(250, 300, "stallParts", "bg_blue.png");
        my.sprite.background1.setScale(2);

        my.sprite.background2 = this.add.sprite(750, 300, "stallParts", "bg_blue.png");
        my.sprite.background2.setScale(2);

        my.sprite.stick1 = this.add.sprite(720, 100, "objectParts", "stick_wood.png");
        my.sprite.stick1.flipY = true;
        my.sprite.stick1.setScale(.75);
        my.sprite.cloud1 = this.add.sprite(720, 150, "stallParts", "cloud2.png");
        my.sprite.cloud1.setScale(.75);
        //my.sprite.stick2 = this.add.sprite(600, 200, "objectParts", "stick_wood_outline");
        //my.sprite.stick2.flipY = true;

        my.sprite.stick2 = this.add.sprite(400, 130, "objectParts", "stick_wood.png");
        my.sprite.stick1.flipY = true;
        my.sprite.stick1.setScale(.75);
        my.sprite.cloud1 = this.add.sprite(400, 200, "stallParts", "cloud2.png");
        my.sprite.cloud1.setScale(.75);


        my.sprite.tree1 = this.add.sprite(600, 250, "stallParts",  "tree_pine.png");

        my.sprite.grass1 = this.add.sprite(68, 422, "stallParts", "grass2.png");
        my.sprite.grass2 = this.add.sprite(200, 430, "stallParts", "grass1.png");
        my.sprite.grass3 = this.add.sprite(332, 422, "stallParts", "grass2.png");
        my.sprite.grass4 = this.add.sprite(464, 430, "stallParts", "grass1.png");
        my.sprite.grass5 = this.add.sprite(596, 422, "stallParts", "grass2.png");
        my.sprite.grass6 = this.add.sprite(728, 430, "stallParts", "grass1.png");
        my.sprite.grass7 = this.add.sprite(860, 422, "stallParts", "grass2.png");
        my.sprite.grass8 = this.add.sprite(992, 430, "stallParts", "grass1.png");

        my.sprite.tree2 = this.add.sprite(250, 260, "stallParts",  "tree_oak.png");
        
        //bro why not just push them all in a loop rather than do it manually
        let waterX = 0;
        let waterY = 490;
        let waterWidth = 132;

        for(let i = 0; i < 10; i++){
            let waterSprite = this.add.sprite(waterX, waterY, "stallParts", "water2.png");
            waterSprite.flipX = true;
            my.sprite.water.push(waterSprite);
            waterX += waterWidth;
        }

        //round 2
        for (let i = 0; i < 4; i++) {
            let x = Phaser.Math.Between(100, 900); // Random horizontal position
            let x2 = Phaser.Math.Between(100, 900);

            let duck = this.add.sprite(x, 380, "objectParts", "duck_target_yellow.png")
            let stick = this.add.sprite(x, 486, "objectParts", "stick_wood.png");
            duck.scorePoints = 10; 
            duck.hit = false;
            duck.speed = Phaser.Math.FloatBetween(1, 2.5);       //change the speed so they dont overlap
            stick.speed = duck.speed;
            duck.direction = Phaser.Math.Between(0, 1) ? 1 : -1; // Random direction
            stick.direction = duck.direction;
            duck.baseY = duck.y;
            stick.baseY = stick.y;

            my.sprite.sticks3.push(stick);
            my.sprite.ducks3.push(duck);
        }

        waterX = 0;
        waterY = 530;
        for(let i = 0; i < 10; i++){
            let waterSpriteLeft = this.add.sprite(waterX, waterY, "stallParts", "water2.png");
            my.sprite.waterLeft.push(waterSpriteLeft);
            waterX += waterWidth;
        }

        my.sprite.table = this.add.sprite(500, 1025, "stallParts", "bg_wood.png");
        my.sprite.table.setScale(4);
        my.sprite.table.flipY = true;

        my.sprite.Lcurtain = this.add.sprite(100, 300, "stallParts", "curtain.png");
        my.sprite.Lcurtain.setScale(2);

        my.sprite.Rcurtain = this.add.sprite(900, 300, "stallParts", "curtain.png");
        my.sprite.Rcurtain.setScale(2);
        my.sprite.Rcurtain.flipX = true;

        my.sprite.LcurtainRope = this.add.sprite(10, 310, "stallParts", "curtain_rope.png");
        my.sprite.LcurtainRope.setScale(2);

        my.sprite.RcurtainRope = this.add.sprite(990, 310, "stallParts", "curtain_rope.png");
        my.sprite.RcurtainRope.setScale(2);
        my.sprite.RcurtainRope.flipX = true;

        my.sprite.Topcurtain1 = this.add.sprite(250, 25, "stallParts", "curtain_straight.png");
        my.sprite.Topcurtain1.setScale(2);

        my.sprite.Topcurtain2 = this.add.sprite(762, 25, "stallParts", "curtain_straight.png");
        my.sprite.Topcurtain2.setScale(2);

        my.sprite.gun = this.add.sprite(600, 570, "objectParts", "rifle.png");
        my.sprite.gun.setScale(0.75);

        // Create the "bullet" offscreen and make it invisible to start
        //my.sprite.shot = this.add.sprite(-10, -10, "hudParts", "icon_bullet_gold_short.png");
        //my.sprite.shot.visible = false;

        //add the bullet sprite to the array to be fired 
        for (let i=0; i < this.maxBullets; i++) {
            // create a sprite which is offscreen and invisible
            my.sprite.bullet.push(this.add.sprite(-100, -100, "hudParts", "icon_bullet_gold_short.png"));
            my.sprite.bullet[i].visible = false;
        }

        my.sprite.bullet1 = this.add.sprite(160, 550, "hudParts", "icon_bullet_gold_long.png");
        my.sprite.bullet2 = this.add.sprite(190, 550, "hudParts", "icon_bullet_gold_long.png");
        my.sprite.bullet3 = this.add.sprite(220, 550, "hudParts", "icon_bullet_gold_long.png");

        //my.sprite.cross = this.add.sprite(550, 400, "hudParts", "crosshair_white_small.png");

        // Create key objects
        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.nextScene = this.input.keyboard.addKey("S");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Set movement speeds (in pixels/tick)
        this.playerSpeed = 4;
        this.bulletSpeed = 10;

        // Put score on screen
        my.text.score = this.add.text(800, 10, "Score " + this.myScore, {
            fontFamily: 'times, serif',
            fontSize: 24
        });

        // Put title on screen
        this.add.text(10, 5, "Duck Game", {
            fontFamily: 'Times, serif',
            fontSize: 24,
            wordWrap: {
                width: 60
            }
        });
        
        //timer countdown
        this.my.text.timer = this.add.text(400, 10, "Time: " + this.remainingTime, {
            fontFamily: 'times, serif',
            fontSize: 24
        });

        this.time.addEvent({
            delay: 1000, // 1 second
            callback: () => {
                this.remainingTime--;
                this.registry.set('remainingTime', this.remainingTime); //throw it into the registry for other stuff to use
                // Update the timer text
                this.my.text.timer.setText("Time: " + this.remainingTime);
        
                // Check if time is up
                if (this.remainingTime <= 0) {
                    this.endRound(); // handle scene transition
                }
            },
            loop: true
        });

        // update HTML description
        document.getElementById('description').innerHTML = '<h2>Carnival Ducks!</h2><br>A: left // D: right // Space: fire/emit'
    }

    update() {
        let my = this.my;
        this.bulletCooldownCounter--;

        this.myScore = this.registry.get('myScore')

        // Moving left
        if (this.left.isDown) {
            // Check to make sure the sprite can actually move left
            if (my.sprite.gun.x > (my.sprite.gun.displayWidth/2)) {
                my.sprite.gun.x -= this.playerSpeed;
            }
        }

        // Moving right
        if (this.right.isDown) {
            // Check to make sure the sprite can actually move right
            if (my.sprite.gun.x < (game.config.width - (my.sprite.gun.displayWidth/2))) {
                my.sprite.gun.x += this.playerSpeed;
            }
        }
        

        //couldnt figure out the scrolling screen thing so i had to gpt it unfortunantly im sorry
        //but i totoally understand what iw as doing wrong now
        for (let water of my.sprite.water) {
            water.x -= 1;
            if (water.x < -water.width / 2) {
                // Find the rightmost water sprite
                let maxX = Math.max(...my.sprite.water.map(w => w.x));
                water.x = maxX + water.width-1;
            }
        }

        for (let waterL of my.sprite.waterLeft) {
            waterL.x += 1;
            if (waterL.x > game.config.width + waterL.width / 2) {
                // Find the rightmost water sprite
                let minX = Math.min(...my.sprite.waterLeft.map(w => w.x));
                waterL.x = minX - waterL.width+1;
            }
        }


        for (let duck of my.sprite.ducks3) {
            
            duck.x += duck.speed * duck.direction;
           //make the duck bounve up and down
            duck.y = duck.baseY + Math.sin(duck.x * this.verticalFrequency) * this.verticalAmplitude;
 
            // Change direction if duck hits bounds
            if (duck.x > game.config.width - 50 || duck.x < 50) {
                duck.direction *= -1;
            }
        }

        //moves the sticks
        for (let stick of my.sprite.sticks3) {
            stick.x += stick.speed * stick.direction;
            //make the stick bounce with the ducks movment
            stick.y = stick.baseY + Math.sin(stick.x * this.verticalFrequency) * this.verticalAmplitude;
            
            // Change direction if duck hits bounds
            if (stick.x > game.config.width - 50 || stick.x < 50) {
                stick.direction *= -1;
            }
        }

       
            // Check for bullet being fired
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            // Only start the bullet if it's not currently active
            if (!this.bulletActive) {
                // Set the active flag to true
                this.bulletActive = true;
                // Set the position of the bullet to be the location of the player
                // Offset by the height of the sprite, so the "bullet" comes out of
                // the top of the player avatar, not the middle.
                my.sprite.bullet.x = my.sprite.gun.x;
                my.sprite.bullet.y = my.sprite.gun.y - my.sprite.gun.displayHeight/2;
                my.sprite.bullet.visible = true;
            }
        }


        if (this.space.isDown && this.bulletCooldownCounter < 0 && !this.fireDelayActive) {
            for (let bullet of my.sprite.bullet) {
                if (!bullet.visible) {
                    bullet.x = my.sprite.gun.x;
                    bullet.y = my.sprite.gun.y - (bullet.displayHeight / 2);
                    bullet.visible = true;
                    this.bulletCooldownCounter = this.bulletCooldown;
        
                    this.bulletsFired++;
        
                    // Change bullet texture based on how many fired
                    if (this.bulletsFired === 1) {
                        my.sprite.bullet1.setTexture("hudParts", "icon_bullet_empty_long.png");
                    } else if (this.bulletsFired === 2) {
                        my.sprite.bullet2.setTexture("hudParts", "icon_bullet_empty_long.png");
                    } else if (this.bulletsFired === 3) {
                        my.sprite.bullet3.setTexture("hudParts", "icon_bullet_empty_long.png");
        
                        // Start delay before next firing
                        this.fireDelayActive = true;
        
                        this.time.delayedCall(this.fireResetDelay, () => {
                            // Reset bullet count and textures
                            this.bulletsFired = 0;
                            this.fireDelayActive = false;
        
                            my.sprite.bullet1.setTexture("hudParts", "icon_bullet_gold_long.png");
                            my.sprite.bullet2.setTexture("hudParts", "icon_bullet_gold_long.png");
                            my.sprite.bullet3.setTexture("hudParts", "icon_bullet_gold_long.png");
                        });
                    }
        
                    break;
                }
            }
        }

        // Make all of the bullets move
        for (let bullet of my.sprite.bullet) {
            // if the bullet is visibile it's active, so move it
            if (bullet.visible) {
                bullet.y -= this.bulletSpeed;
            }
            // Did the bullet move offscreen? If so,
            // make it inactive (make it invisible)
            // This allows us to re-use bullet sprites
            if (bullet.y < -(bullet.displayHeight/2)) {
                bullet.visible = false;
            }
        }

        // Check for collision with the duck
        //additional checek to make the bullet hole to the duck
        for(let bullet of my.sprite.bullet){
            for(let duck of my.sprite.ducks3){
                if (this.collides(duck, bullet)) {
                    // clear out bullet -- put y offscreen, will get reaped next update
                    bullet.y = -100;
                    //my.sprite.hole.visible = true;
                    //my.sprite.hole.x = duck.x - 2;
                    //my.sprite.hole.y = duck.y + 12;
                    if(!duck.hit){
                        duck.setTexture("objectParts", "duck_back.png");
                        // Update score
                        this.sound.play("impact", {
                            volume: 1   // Can adjust volume using this, goes from 0 to 1
                        });
                        //GameData.score += duck.scorePoints;
                        this.myScore += duck.scorePoints;
                        this.registry.set('myScore', this.myScore);
                        this.updateScore();
                    }

                    duck.hit = true;
                }
            }
        }

            //check if all the ducks were shot
            let allShot = my.sprite.ducks3.every(duck => duck.hit);
            //console.log(my.sprite.ducks1.map(d => d.wasShot));

            if(allShot === true){
                allShot = false;
                for (let duck of my.sprite.ducks3) {
                    duck.visible = false;
                    duck.x = -1000; // Move offscreen
                }
                for(let stick of my.sprite.sticks3){
                    stick.visible = false;
                    stick.x = -1000;
                }

                //Game.Data.reset();
                //start the next round? 
                this.scene.start("round2");

            }

    }

    endRound() {
        // Optionally do cleanup or show a transition
        this.scene.stop("round3");
        this.scene.start("end");  // or whatever the next scene is
    }

    // A center-radius AABB collision check
    collides(a, b){
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
    
    
    updateScore() {
        let my = this.my;
        my.text.score.setText("Score " + this.myScore);
    }
    
}