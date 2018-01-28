import { createWorld, totalPoeple } from 'javascripts/world'
import { createLoop } from 'javascripts/loop'

class Main extends Phaser.State {

  preload() {
    this.game.load.image('forest', 'images/assests/map/8_forest@2x.png')
    this.game.load.image('plaine', 'images/assests/map/3_grass@2x.png')
  }

  create() {
    const world = createWorld()
    this.simLoop = createLoop(this)
    this.createGameObjects()
    this.apply(world)
  }

  update() {
  }

  apply(world) {
    const total = totalPoeple(world)
    this.text.setText(`population: ${total} \nfood: ${world.food}`)
  }

  createGameObjects(){
    this.createMap()
    this.createText()
  }

  createMap(){
    let map = this.game.add.group()
    for (let x = 0; x < 15; x++) {
      for (let y = 0; y < 12; y++) {
        if (y < 8){
          map.create(x * 55, y * 55, 'forest')
        } else {
          map.create(x * 55, y * 55, 'plaine')
        }
      }
    }
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

}

export default Main;
