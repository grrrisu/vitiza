import { totalPoeple } from 'javascripts/world'

export const applyGame = ({type, payload}, world, game) => {

  switch(type){

    case 'updateFood':
      return applyText(game.text, world)

    case 'updatePopulationAndFood':
      return applyText(game.text, world)

    default:
      console.log(`WARNING: unknown tpye ${type} `)
      return null
  }
}

const applyText = (component, world) => {
  const total = totalPoeple(world)
  component.setText(`population: ${total} \nfood: ${world.food}`)
}
