import Phaser from "phaser";

class player {
  constructor(scene, world) {
    this.world = world;
    this.scene = scene;
  }
  create(x, y) {
    this.scene.player = this.scene.physics.add
      .sprite(1900, 1800, "atlas", "misa-front")
      .setSize(20, 10)
      .setOffset(5, 50);

    // Watch the this.player and worldLayer for collisions, for the duration of the scene:
    this.scene.physics.add.collider(
      this.scene.player,
      this.world.worldLayer,
      function() {
        console.log("asdf");
      }
    );
    //console.log(this.world.worldLayer);
    // Create the this.player's walking animations from the texture atlas. These are stored in the global
    // animation manager so any sprite can access them.
    const anims = this.scene.anims;
    anims.create({
      key: "misa-left-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "misa-left-walk.",
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-right-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "misa-right-walk.",
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-front-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "misa-front-walk.",
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-back-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "misa-back-walk.",
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    const camera = this.scene.cameras.main;
    camera.startFollow(this.scene.player);
    camera.setBounds(
      0,
      0,
      this.world.map.widthInPixels,
      this.world.map.heightInPixels
    );

    this.scene.cursors = this.scene.input.keyboard.createCursorKeys();

    // Help text that has a "fixed" position on the screen
    this.scene.add
      .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0)
      .setDepth(30);

    // Debug graphics
    this.scene.input.keyboard.once("keydown_D", event => {
      // Turn on physics debugging to show this.player's hitbox
      this.scene.physics.world.createDebugGraphic();

      // Create worldLayer collision graphic above the this.player, but below the help text
      const graphics = this.scene.add
        .graphics()
        .setAlpha(0.75)
        .setDepth(20);
      this.world.worldLayer.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
    });
  }

  update(time, delta) {
    const speed = 175;
    const prevVelocity = this.scene.player.body.velocity.clone();

    // Stop any previous movement from the last frame
    this.scene.player.body.setVelocity(0);

    // Horizontal movement
    if (this.scene.cursors.left.isDown) {
      this.scene.player.body.setVelocityX(-speed);
    } else if (this.scene.cursors.right.isDown) {
      this.scene.player.body.setVelocityX(speed);
    }

    // Vertical movement
    if (this.scene.cursors.up.isDown) {
      this.scene.player.body.setVelocityY(-speed);
    } else if (this.scene.cursors.down.isDown) {
      this.scene.player.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that this.scene.player can't move faster along a diagonal
    this.scene.player.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.scene.cursors.left.isDown) {
      this.scene.player.anims.play("misa-left-walk", true);
    } else if (this.scene.cursors.right.isDown) {
      this.scene.player.anims.play("misa-right-walk", true);
    } else if (this.scene.cursors.up.isDown) {
      this.scene.player.anims.play("misa-back-walk", true);
    } else if (this.scene.cursors.down.isDown) {
      this.scene.player.anims.play("misa-front-walk", true);
    } else {
      this.scene.player.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.x < 0)
        this.scene.player.setTexture("atlas", "misa-left");
      else if (prevVelocity.x > 0)
        this.scene.player.setTexture("atlas", "misa-right");
      else if (prevVelocity.y < 0)
        this.scene.player.setTexture("atlas", "misa-back");
      else if (prevVelocity.y > 0)
        this.scene.player.setTexture("atlas", "misa-front");
    }
  }
}
export default player;
