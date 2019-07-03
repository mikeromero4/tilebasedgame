import Phaser from "phaser";
import player from "./player";
import map from "./map";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

new Phaser.Game(config);
//let showDebug = false;

function preload() {
  this.load.image(
    "tiles",
    "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilesets/tuxmon-sample-32px-extruded.png"
  );
  this.load.tilemapTiledJSON("map", "./map1.json");
  this.load.atlas(
    "atlas",
    "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png",
    "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json"
  );
}

function create() {
  this.map = new map(this);
  let world = this.map.create();

  this.player1 = new player(this, world);
  this.player1.create();
}

function update() {
  this.player1.update();
}
