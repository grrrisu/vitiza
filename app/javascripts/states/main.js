import { createWorld, getWorld } from 'javascripts/world'
import { createLoop } from 'javascripts/loop'

class Main extends Phaser.State {

  preload() {
  }

  create() {
    createWorld()
    this.simLoop = createLoop(this.game)

    let style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    this.text = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      "population",
      style);
    this.text.anchor.set(0.5);
  }

  update() {
    const { population } = getWorld()
    this.text.setText(`population: ${population}`)
  }

}

export default Main;
