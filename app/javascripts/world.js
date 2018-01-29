let world = {}

const initialState = () => {
  return {
    vegetation: {},
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
  forestRatio: 2/3
}

const createVegatation = (config = worldConfig) => {
  const { width, height, forestRatio } = config
  let vegetation = {}
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let type = ''
      if (y < height * forestRatio){
        type = 'forest'
      } else {
        type = 'plaine'
      }
      const field = {x: x, y: y, type: type}
      vegetation[[x,y]] = field
    }
  }
  return vegetation
}

export const createWorld = () => {
  let world = initialState()
  let newWorld = {
    ...world,
    vegetation: createVegatation()
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
