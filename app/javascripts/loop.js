import { getWorld, setWorld } from 'javascripts/world'

export const createLoop = (state) => {
  return state.game.time.events.loop(2000, sim, this, 2000, state);
}

const sim = (delta, state) => {
  let { population } = getWorld()
  let newWorld = setWorld({
    population: population + 10
  })
  state.apply(newWorld)
  console.log(`sim ${delta} ${newWorld.population}`)
}
