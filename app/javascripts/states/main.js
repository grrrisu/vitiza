import { createWorld, totalPoeple } from 'javascripts/world'
import { createLoop } from 'javascripts/loop'

class Main extends Phaser.State {

  preload() {
  }

  create() {
    const world = createWorld()
    this.simLoop = createLoop(this)
    this.createText()
    this.apply(world)
  }

  update() {
  }

  apply(world) {
    const total = totalPoeple(world)
    this.text.setText(`population: ${total} \nfood: ${world.food}`)
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
