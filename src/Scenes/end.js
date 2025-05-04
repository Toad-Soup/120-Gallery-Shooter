//import { GameData } from './GameData.js';
class end extends Phaser.Scene {
    constructor() {
        super("end");

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

    }

    create() {
        let my = this.my;

        this.myScore = this.registry.get('myScore') || 0;

        //create a background first
        my.sprite.background1 = this.add.sprite(250, 200, "stallParts", "bg_red.png");
        my.sprite.background1.setScale(2);

        my.sprite.background2 = this.add.sprite(750, 200, "stallParts", "bg_red.png");
        my.sprite.background2.setScale(2);

        //create a background first
        my.sprite.background1 = this.add.sprite(250, 500, "stallParts", "bg_red.png");
        my.sprite.background1.setScale(2);
        
        my.sprite.background2 = this.add.sprite(750, 500, "stallParts", "bg_red.png");
        my.sprite.background2.setScale(2);
  
        my.sprite.timeUp = this.add.sprite(500, 200, "hudParts", "text_timeup.png");
        my.sprite.timeUp.setScale(1.5);

        // Create key objects
        this.nextScene = this.input.keyboard.addKey("R");
        //this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Put score on screen
        my.text.score = this.add.text(440, 300, "Final Score " + this.myScore, {
            fontFamily: 'times, serif',
            fontSize: 24
        });

        my.text.score = this.add.text(410, 400, "Press 'R' to Replay!", {
            fontFamily: 'times, serif',
            fontSize: 24
        });

        // Put title on screen
        this.add.text(410, 100, "thanks for playing!", {
            fontFamily: 'Times, serif',
            fontSize: 24,
        });
        

        // update HTML description
        document.getElementById('description').innerHTML = '<h2>Carnival Ducks!</h2><br>A: left // D: right // Space: fire/emit'
    }

    update() {
        
        //if the user presses R, reset the while thing
        // Check for bullet being fired
        if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("round1");
        }
        
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