import { createWorld, totalPoeple } from 'javascripts/world'
import { createLoop } from 'javascripts/loop'

class Main extends Phaser.State {

  preload() {
    // key == vegetation.type
    this.game.load.image('forest', 'images/assests/map/8_forest@2x.png')
    this.game.load.image('plaine', 'images/assests/map/3_grass@2x.png')

    this.game.load.image('tower', 'images/assests/buildings/tower.png')
    this.game.load.image('farm', 'images/assests/buildings/farm.png')
    this.game.load.image('hut', 'images/assests/buildings/hut.png')
  }

  create() {
    console.time('create')
    this.fieldWidth = 55
    const world = createWorld()
    this.createGameObjects(world)
    this.simLoop = createLoop(this)
    console.timeEnd('create')
  }

  update() {
  }

  apply(world) {
    console.time('apply')
    this.applyMap(world, this.fieldWidth)
    this.applyBuildings(world, this.fieldWidth)
    //this.applyText(world)
    console.timeEnd('apply')
  }

  createGameObjects(world){
    this.createMap(world, this.fieldWidth)
    this.createGrid(world)
    this.createBuildings(world)
    this.createText()
  }

  createGrid(world){
    let size =  this.fieldWidth * this.game.resolution
    let color = 'rgba(20, 20, 20, 1)'
    this.game.add.sprite(0, 0,
      this.game.create.grid('grid', 15 * size, 12 * size, size, size, color)
    );
  }

  createMap(world, width){
    this.map = this.game.add.group()
    let { vegetation } = world
    R.values(vegetation).forEach((field) => {
      let { x, y, type } = field
      this.map.create(x * width, y * width, type)
    })
  }

  applyMap(world, width){
    const { vegetation } = world
    this.map.getAll().forEach((tile) => {
      const {x , y} = tile.position
      let field = vegetation[[x / width, y / width]]
      if(tile.key !== field.type){
        tile.destroy()
        this.map.create(x, y, field.type)
      }
    })
  }

  createBuildings(world){
    this.buildings = this.game.add.group()
    let { buildings } = world
    buildings.forEach((building) => {
      let { position, type } = building
      this.buildings.create(position.x * 55, position.y * 55, type)
    })
  }

  applyBuildings(world, width){
    const buildings = world
    this.buildings.getAll().forEach((sprite) => {
      const { x, y } = sprite.position
      //let building = R.find(propEq('position', {x: x / width, y: y / width }))(buildings)
      // Stopped here ...
    })
  }

  createText() {
    let style = { font: "34px Arial", fill: "#3D1616", align: "center" };
    this.text = this.game.add.text(
      this.game.world.centerX,
      this.game.world.top,
      "population \nfood",
      style);
    this.text.anchor.set(0.5, 0)
    this.text.fixedToCamera = true
  }

}

export default Main;
