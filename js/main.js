
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var group;
function preload() {
    // Loading the images 
    this.load.image('background', 'assets/images/slotContainer.png')
    this.load.image('potion1', 'assets/images/potion1.png')
    this.load.image('potion4', 'assets/images/potion2.png')
    this.load.image('potion2', 'assets/images/potion3.png')
    this.load.image('potion3', 'assets/images/potion4.png')
    this.load.image('spin', 'assets/images/button_spin.png')
    this.load.image('stop', 'assets/images/button_stop.png')
    this.load.audio('BG_Music', 'assets/images/BG_Music.wav')
    this.load.audio('Spin', 'assets/images/Spin.wav')

}
var platforms;
var p1; var p2; var p3; var p4;
function create(scene) {
    let Music = this.sound.add('BG_Music');
    let seMusic = this.sound.add('Spin');
    this.add.image(355, 280, 'background');

    // Creating the sprites for each wheel
    p1 = this.add.sprite(200, 200, 'potion1').setScale(.5);
    p2 = this.add.sprite(200, 275, 'potion2').setScale(.5);
    p3 = this.add.sprite(200, 350, 'potion3').setScale(.5);
    p4 = this.add.sprite(200, 425, 'potion4').setScale(.5);

    p11 = this.add.sprite(300, 200, 'potion1').setScale(.5);
    p12 = this.add.sprite(300, 275, 'potion2').setScale(.5);
    p13 = this.add.sprite(300, 350, 'potion3').setScale(.5);
    p14 = this.add.sprite(300, 425, 'potion4').setScale(.5);

    p21 = this.add.sprite(400, 200, 'potion1').setScale(.5);
    p22 = this.add.sprite(400, 275, 'potion2').setScale(.5);
    p23 = this.add.sprite(400, 350, 'potion3').setScale(.5);
    p24 = this.add.sprite(400, 425, 'potion4').setScale(.5);

    function spinWheel1() {
        p1.play('spinWheel1');
        p2.play('spinWheel2');
        p3.play('spinWheel3');
        p4.play('spinWheel4');
    }
    function stopWheel1() {
        p1.anims.stop(null, true);
        p2.anims.stop(null, true);
        p3.anims.stop(null, true);
        p4.anims.stop(null, true);
    }

    function spinWheel2() {
        p11.play('spinWheel1');
        p12.play('spinWheel2');
        p13.play('spinWheel3');
        p14.play('spinWheel4');
    }
    function stopWheel2() {
        p11.anims.stop(null, true);
        p12.anims.stop(null, true);
        p13.anims.stop(null, true);
        p14.anims.stop(null, true);
    }
    function spinWheel3() {
        p21.play('spinWheel1');
        p22.play('spinWheel2');
        p23.play('spinWheel3');
        p24.play('spinWheel4');
    }
    function stopWheel3() {
        p21.anims.stop(null, true);
        p22.anims.stop(null, true);
        p23.anims.stop(null, true);
        p24.anims.stop(null, true);
    }

    this.anims.create({
        key: "spinWheel1",
        frames: [
            { key: 'potion1', frame: null },
            { key: 'potion2', frame: null },
            { key: 'potion3', frame: null },
            { key: 'potion4', frame: null }
        ],
        frameRate: 4,
        repeat: -1
    });
    this.anims.create({
        key: "spinWheel2",
        frames: [
            { key: 'potion2', frame: null },
            { key: 'potion3', frame: null },
            { key: 'potion4', frame: null },
            { key: 'potion1', frame: null }
        ],
        frameRate: 4,
        repeat: -1
    });
    this.anims.create({
        key: "spinWheel3",
        frames: [
            { key: 'potion3', frame: null },
            { key: 'potion4', frame: null },
            { key: 'potion1', frame: null },
            { key: 'potion2', frame: null }
        ],
        frameRate: 4,
        repeat: -1
    });
    this.anims.create({
        key: "spinWheel4",
        frames: [
            { key: 'potion4', frame: null },
            { key: 'potion1', frame: null },
            { key: 'potion2', frame: null },
            { key: 'potion3', frame: null }
        ],
        frameRate: 4,
        repeat: -1
    });

    var spin = this.add.sprite(575, 450, 'spin', 0).setInteractive().setScale(.5);
    var isSpining = false;
    var Clicks = 0;
    var ShouldStop = false;

    spin.on('pointerdown', function () {
        // Checking if 'spin' has been clicked 
        if (isSpining) {
            spin.setTexture('stop', 0);
            spin.alpha = 1;
            // if Now is third click
            if (Clicks == 2) {
                stopWheel1();
                stopWheel2();
                stopWheel3();
                // Set to begining texture
                p1.setTexture('potion1', 0);
                p2.setTexture('potion2', 0);
                p3.setTexture('potion3', 0);
                p4.setTexture('potion4', 0);
                p11.setTexture('potion1', 0);
                p12.setTexture('potion2', 0);
                p13.setTexture('potion3', 0);
                p14.setTexture('potion4', 0);
                p21.setTexture('potion1', 0);
                p22.setTexture('potion2', 0);
                p23.setTexture('potion3', 0);
                p24.setTexture('potion4', 0);
                console.log("stopping");
                Music.play();
                seMusic.stop();
            }
            else {
                Clicks = 2;
                console.log("Sec click");
            }
        }
        else {
            Clicks = 1;
            isSpining = true;
            Music.stop();
            seMusic.play();
            spin.alpha = 0.5;

            spinWheel1();
            spinWheel2();
            spinWheel3();

            // Stoping the reels one after each other
            setTimeout(async function () {
                stopWheel1();
            }, 2000);
            setTimeout(async function () {
                stopWheel2();
            }, 2500);
            setTimeout(async function () {
                stopWheel3();
                Music.play();
                seMusic.stop();
            }, 3000);
            setTimeout(async function () {
                spin.alpha = 1;
                isSpining = false;
                spin.setTexture('spin', 0);
            }, 2000);
        }

    });
    spin.on('pointerup', function () {

    });
    Music.play();
}
function update() {
}