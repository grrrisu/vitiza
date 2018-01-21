import { getWorld, setWorld, totalPoeple } from 'javascripts/world'

export const createLoop = (state) => {
  return state.game.time.events.loop(2000, sim, this, 2000, state);
}

const sim = (delta, state) => {
  let newWorld = getWorld()

  newWorld = eat(delta, newWorld)
  newWorld = harvest(delta, newWorld)
  newWorld = birth(delta, newWorld)

  state.apply(newWorld)
  setWorld(newWorld)
  console.log(`sim ${delta} ${newWorld.food}`)
}

const eat = (delta, world) => {
  return {
    ...world,
    food: world.food - totalPoeple(world)
  }
}

const harvest = (delta, world) => {
  return {
    ...world,
    food: world.food + 5 * world.population.farmer
  }
}

const birth = (delta, world) => {
  let { population, food } = world
  let newBorn = Math.floor(food / 10)

  return {
    ...world,
    population: {
      ...population,
      pawn: population.pawn + newBorn
    },
    food: food - newBorn * 10
  }
}
