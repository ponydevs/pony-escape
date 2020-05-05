import {
   PonyDisplay,
   PonyInput,
   Square,
   Player,
   Pair,
} from '../type/ponyEscape'
import { generateLabyrinth } from './labyrinth/generateLabyrinth'
import { w } from '../util/window'

export interface LoadProp {
   display: PonyDisplay
   input: PonyInput
   size: Pair
}

export let core = (prop: LoadProp) => {
   let { display, input, size } = prop

   let grid = generateLabyrinth(size)

   w.grid = grid

   let player: Player = {
      x: 1,
      y: Math.floor(size.y / 2) * 2 - 1,
   }

   let score = 0

   input.left.subscribe(() => {
      player.x -= 2
      render()
   })
   input.right.subscribe(() => {
      player.x += 2
      render()
   })
   input.up.subscribe(() => {
      player.y -= 2
      render()
   })
   input.down.subscribe(() => {
      player.y += 2
      render()
   })

   let render = () => {
      display.render({
         grid,
         monster: undefined,
         player,
         score,
         screen: 'play',
      })
   }

   render()
}
