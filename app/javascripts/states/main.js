import { createWorld, totalPoeple } from 'javascripts/world'
import { createLoop } from 'javascripts/loop'

class Main extends Phaser.State {

  preload() {
    // key == vegetation.type
    this.game.load.image('forest', 'images/assests/map/8_forest@2x.png')
    this.game.load.image('plaine', 'images/assests/map/3_grass@2x.png')
  }

  create() {
    const world = createWorld()
    this.simLoop = createLoop(this)
    this.createGameObjects(world)
    this.apply(world)
  }

  update() {
  }

  apply(world) {
    this.applyText(world)
  }

  createGameObjects(world){
    this.createMap(world)
    this.createText()
    // this.game.world.children => [map, text]
  }

  createMap(world){
    let map = this.game.add.group()
    let { vegetation } = world
    vegetation.forEach((field) => {
      let { x, y, type } = field
      map.create(x * 55, y * 55, type)
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
