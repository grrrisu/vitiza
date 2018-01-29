import { getWorld, setWorld, totalPoeple } from 'javascripts/world'

export const createLoop = (state) => {
  return state.game.time.events.loop(2000, sim, this, 2000, state);
}

const sim = (delta, state) => {
  console.time('sim')
  let newWorld = getWorld()

  newWorld = eat(delta, newWorld)
  newWorld = harvest(delta, newWorld)
  newWorld = birth(delta, newWorld)
  console.timeEnd('sim')

  state.apply(newWorld)
  setWorld(newWorld)
}

const eat = (delta, world) => {
  return {
    ...world,
    food: world.food - totalPoeple(world)
  }
}

const harvest = (delta, world) => {
  const { farmer, pawn } = world.population
  const newFood = 5 * farmer + 1 * pawn
  return {
    ...world,
    food: world.food + newFood
  }
}

const birth = (delta, world) => {
  const { population, food } = world
  const newBorn = Math.floor(food / 10)

  return {
    ...world,
    population: {
      ...population,
      pawn: population.pawn + newBorn
    },
    food: food - newBorn * 10
  }
}
