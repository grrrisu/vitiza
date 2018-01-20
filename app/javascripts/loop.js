import { getWorld, setWorld } from 'javascripts/world'

export const createLoop = (game) => {
  return game.time.events.loop(2000, sim, this, 2000);
}

const sim = (delta) => {
  let { population } = getWorld()
  let newWorld = setWorld({
    population: population + 10
  })
  console.log(`sim ${delta} ${newWorld.population}`)
}
