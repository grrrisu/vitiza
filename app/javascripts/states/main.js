class Main extends Phaser.State {

  preload() {
  }

  create() {
    this.game.time.events.loop(2000, this.sim, this, 2000);
  }

  update() {
  }

  sim(delta) {
    console.log(`sim ${delta}`)
  }

}

export default Main;
