//import { GameData } from './GameData.js';
class start extends Phaser.Scene {
    constructor() {
        super("start");

        // Initialize a class variable "my" which is an object.
        // The object has one property, "sprite" which is also an object.
        // This will be used to hold bindings (pointers) to created sprites.
        this.my = {sprite: {}, text: {}};   
        
 
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.atlasXML("objectParts", "spritesheet_objects.png", "spritesheet_objects.xml");
        this.load.atlasXML("hudParts", "spritesheet_hud.png", "spritesheet_hud.xml");
        this.load.atlasXML("stallParts", "spritesheet_stall.png", "spritesheet_stall.xml");

    }

    create() {
        let my = this.my;
        /*
        this.gameDuration = 30; //90 seconds
        this.remainingTime = this.gameDuration;

        this.verticalAmplitude = 20;    // how far up/down ducks move
        this.verticalFrequency = 0.05;  // how fast the wave goes

        this.bulletsFired = 0;
        this.fireDelayActive = false;
        this.fireResetDelay = 1000;     // in milliseconds (1 second)

                // Create a flag to determine if the "bullet" is currently active and moving
        // Create a property inside "sprite" named "bullet".
        // The bullet property has a value which is an array.
        // This array will hold bindings (pointers) to bullet sprites
        this.my.sprite.bullet = [];   
        this.maxBullets = 3;           // Don't create more than this many bullets
        this.bulletCooldown = 20;        // Number of update() calls to wait before making a new bullet
        this.bulletCooldownCounter = 0;
        this.bulletCounter = 0;

        */
        this.my.sprite.water = [];
        this.my.sprite.waterLeft = [];
        //create different arrays for different levels
        /*
        this.my.sprite.ducks1 = [];
        this.my.sprite.sticks1 = [];  

        this.my.sprite.ducks2 = [];
        this.my.sprite.sticks2 = [];

        this.my.sprite.ducks3 = []; 
        this.my.sprite.sticks3 = [];

        this.my.sprite.holes = [];   
        */

        this.maxWater = 8;
        this.myScore = 0;


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

    //create the duck sprite ************************************************************
        //my.sprite.stick4 = this.add.sprite(400, 450, "objectParts", "stick_wood.png");
        //my.sprite.duck1 = this.add.sprite(400, 380, "objectParts", "duck_target_yellow.png");
        //my.sprite.duck1.scorePoints = 10;
        /*
        //round 1
        for (let i = 0; i < 3; i++) {
            let x = Phaser.Math.Between(100, 900); // Random horizontal position
        
            let duck = this.add.sprite(x, 380, "objectParts", "duck_target_white.png");
            let stick = this.add.sprite(x, 486, "objectParts", "stick_wood.png");
            duck.speed = Phaser.Math.FloatBetween(0.8, 2.2);    //assign a radnom speed to the duck, so they dont get stuck behind eachother
            //duck.baseY = duck.y;
            //stick.baseY = stick.y;
            stick.speed = duck.speed;
            duck.scorePoints = 5;
            duck.hit = false;
            duck.direction = Phaser.Math.Between(0, 1) ? 1 : -1; // Random direction
            stick.direction = duck.direction;
            my.sprite.sticks1.push(stick);
            my.sprite.ducks1.push(duck);
        }
        */

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

        //my.sprite.hole = this.add.sprite(-100, 380, "objectParts", "shot_yellow_small.png");
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
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Set movement speeds (in pixels/tick)
        this.playerSpeed = 3;
        this.bulletSpeed = 10;


        // Put title on screen
        this.add.text(327, 10, "Duck Game", {
            fontFamily: 'Times, serif',
            fontSize: 70,
            wordWrap: {
                width: 500
            }
        });
        
        this.continueText = this.add.text(370, 130, "Press SPACE to Start!", {
            fontFamily: 'Times, serif',
            fontSize: 30,
            wordWrap: {
                width: 500
            }
        });

        this.flash = this.time.addEvent({
            delay: 500,            // time in ms between flashes
            callback: () => {
                this.continueText.visible = !this.continueText.visible;  // toggle visibility
            },
            loop: true             // repeat forever
        });

        my.sprite.Ready = this.add.sprite(500, 300, "hudParts","text_ready.png" )
        my.sprite.Ready.visible = false;
        my.sprite.Go = this.add.sprite(500, 300, "hudParts", "text_go.png")
        my.sprite.Go.visible = false;


        // update HTML description
        document.getElementById('description').innerHTML = '<h2>Carnival Ducks!</h2><br>A: left // D: right // Space: fire/emit'
    }

    update() {
        let my = this.my;
        this.bulletCooldownCounter--;
        

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

        if (Phaser.Input.Keyboard.JustDown(this.space)) {

            //after 3 seconds, the Ready sprite is displayed
            //after 6 seconds, the Go sprite is displayed
            this.my.sprite.Ready.visible = true;
            //stop the press pace from flashing
            this.flash.remove();
            this.continueText.visible = false;

            // After 1.5 seconds, show "Go"
            this.time.delayedCall(1500, () => {
                this.my.sprite.Ready.visible = false;
                this.my.sprite.Go.visible = true;
            }, [], this);

            // After 3 seconds, go to the next scene
            this.time.delayedCall(3000, () => {
                this.scene.start("round1");
            }, [], this);
            //this.scene.start("round1");
        }
    }
}