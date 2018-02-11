let world = {
  population: {
    farmer:   1,
    pawn:     0,
    vagrant:  0
  },
  food: 5
}

export const createWorld = () => {
  return world
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
