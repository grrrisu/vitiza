import { createWorld, totalPoeple } from 'javascripts/world'
import { createLoop } from 'javascripts/loop'

class Main extends Phaser.State {

  preload() {
    // key == vegetation.type
    this.game.load.image('forest', 'images/assests/map/8_forest@2x.png')
    this.game.load.image('plaine', 'images/assests/map/3_grass@2x.png')
  }

  create() {
    console.time('create')
    this.fieldWidth = 55
    const world = createWorld()
    this.createGameObjects(world)
    this.simLoop = createLoop(this)
    console.timeEnd('create')
    this.apply(world)
  }

  update() {
  }

  apply(world) {
    console.time('apply')
    this.applyMap(world, this.fieldWidth)
    this.applyText(world)
    console.timeEnd('apply')
  }

  createGameObjects(world){
    this.createMap(world, this.fieldWidth)
    this.createText()
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

  createText() {
    let style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    this.text = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      "population \nfood",
      style);
    this.text.anchor.set(0.5);
  }

  applyText(world) {
    const total = totalPoeple(world)
    this.text.setText(`population: ${total} \nfood: ${world.food}`)
  }

}

export default Main;
