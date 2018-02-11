let world = {}

const initialState = () => {
  return {
    vegetation: {},
    buildings: [],
    population: {
      farmer:   1,
      pawn:     0,
      vagrant:  0
    },
    food: 5
  }
}

const worldConfig = {
  width: 15,
  height: 12,
  clearingRadius: 4
}

const createVegatation = (config = worldConfig) => {
  const { width, height, clearingRadius } = config
  let vegetation = {}
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let type = ''
      let withinRadius = Math.abs(y - height/2) + Math.abs(x - width/2)

      if (withinRadius < clearingRadius){
        type = 'plaine'
      } else {
        type = 'forest'
      }
      const field = {x: x, y: y, type: type}
      vegetation[[x,y]] = field
    }
  }
  return vegetation
}

const createBuildings = (config = worldConfig) =>{
  const hq = {
    type: 'tower',
    position: {
      x: 7,
      y: 6
    },
    population: {
      lord: 1,
      gard: 1
    }
  }

  const farm = {
    type: 'farm',
    position: {
      x: 5,
      y: 6
    },
    population: {
      farmer: 1
    }
  }
  return [hq, farm]
}

export const createWorld = () => {
  let world = initialState()
  let newWorld = {
    ...world,
    vegetation: createVegatation(),
    buildings: createBuildings(),
  }
  return setWorld(newWorld)
}

export const getWorld = () => {
  return world
}

export const setWorld = (newWorld) => {
  return world = newWorld
}

export const totalPoeple = (world) => {
  const { population } = world
  return population.farmer + population.pawn + population.vagrant
}

export const applyWorld = (event, world) => {
  return setWorld(
    reduce(event, world)
  )
}

const reduce = ({type, payload}, world) => {
  switch(type){

    case 'updateFood':
      return{
        ...world,
        food: payload.food
      }

    case 'updatePopulationAndFood':
      return {
        ...world,
        population: R.mergeDeepLeft(payload.population, world.population),
        food: payload.food
      }

    default:
      return world
  }
}
