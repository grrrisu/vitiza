let world = {
  population: {
    farmer:   1,
    pawn:     3,
    vagrant:  0
  }
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
