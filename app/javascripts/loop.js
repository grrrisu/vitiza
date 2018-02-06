import { applyWorld, getWorld, totalPoeple } from 'javascripts/world'
//import { applyGame } from 'javascripts/states/main'

export const createLoop = (state) => {
  return state.game.time.events.loop(2000, sim, this, 2000, state);
}

const sim = (delta, state) => {
  console.time('sim')

  dispatch(
    eat(delta, getWorld()),
    state
  )

  dispatch(
    harvest(delta, getWorld()),
    state
  )

  dispatch(
    birth(delta, getWorld()),
    state
  )

  console.timeEnd('sim')
}

const dispatch = (event, state) => {
  applyWorld(event)
  state.apply(getWorld())
}

const eat = (delta, world) => {
  return {
    type: 'updateFood',
    payload: {
      food: world.food - totalPoeple(world)
    }
  }
}

const harvest = (delta, world) => {
  const { farmer, pawn } = world.population
  const newFood = 5 * farmer + 1 * pawn

  return {
    type: 'updateFood',
    payload: {
      food: world.food + newFood
    }
  }
}

const birth = (delta, world) => {
  const { population, food } = world
  const newBorn = Math.floor(food / 10)

  return {
    type: 'updatePopulationAndFood',
    payload: {
      population: {
        ...population,
        pawn: population.pawn + newBorn
      },
      food: food - newBorn * 10
    }
  }
}
