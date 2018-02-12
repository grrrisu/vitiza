import { applyWorld, getWorld, totalPoeple } from 'javascripts/world'
import { applyGame } from 'javascripts/states/game_reducer'

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
  if(event.type === 'void') return null

  const world = applyWorld(event, getWorld())
  applyGame(event, world, state)

  if(event.followUpEvents){
    event.followUpEvents.forEach((followEvent) => {
      dispatch(followEvent.callback(followEvent.arguments, world), state)
    })
  }
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

  if(newBorn == 0){
    return {type: 'void'}
  }

  return {
    type: 'updatePopulationAndFood',
    payload: {
      population: {
        ...population,
        pawn: population.pawn + newBorn
      },
      food: food - newBorn * 10
    },
    followUpEvents: R.times((n) => {
      return {
        callback: settle,
        arguments: {
          type: 'pawn'
        }
      }
    }, newBorn)
  }
}

const settle = (args, world) => {

  let buildingPositions = world.buildings.reduce((pos, building) => {
    pos.push(building.position)
    return pos
  }, [])

  let includesPosition = (field) => {
    return R.none(R.equals({x: field.x, y: field.y}), buildingPositions)
  }

  const freeFields =
    R.filter(includesPosition,
      R.filter(R.propEq('type', 'plaine'),
        R.values(world.vegetation)
      )
    )

  if(freeFields.length > 0) {
    const freeField = freeFields[Math.floor(Math.random() * freeFields.length)]
    return {
      type: 'newBuilding',
      payload: {
        building: {
          type: 'hut',
          position: {
            x: freeField.x,
            y: freeField.y
          },
          population: {
            pawn: 1
          }
        }
      }
    }
  } else {
    return {
      type: 'updatePopulation',
      payload: {
        population: {
          pawn: world.population.pawn - 1,
          vagrant: world.population.vagrant + 1
        }
      }
    }
  }
}
