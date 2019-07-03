class map {
  constructor(scene) {
    this.scene = scene;
  }
  create() {
    const map = this.scene.make.tilemap({ key: "map" });
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("set1", "tiles");
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createStaticLayer("ground", tileset);
    const worldLayer = map.createStaticLayer("objects", tileset);
    //const aboveLayer = map.createStaticLayer("above", tileset);
    //aboveLayer.setDepth(10);
    worldLayer.setCollisionByExclusion([0, -1], true);

    return { map, belowLayer, worldLayer };
  }
}
export default map;
