import {
   PonyDisplay,
   PonyInput,
   Square,
   Player,
   Pair,
   WallSquare,
} from '../type/ponyEscape'
import { generateLabyrinth } from './labyrinth/generateLabyrinth'
import { w } from '../util/window'
import { PonyEscapeConfig } from '../ponyEscapeConfig'

export interface LoadProp {
   display: PonyDisplay
   input: PonyInput
   size: Pair
}

export let core = (prop: LoadProp, config: PonyEscapeConfig) => {
   let { display, input, size } = prop

   let grid = generateLabyrinth(size, config)
   let wallGrid = grid as WallSquare[][]

   w.grid = grid

   let player: Player = {
      x: 1,
      y: Math.floor(size.y / 2) * 2 - 1,
   }

   wallGrid[player.y][0].filled = 'empty'
   wallGrid[player.y][size.x * 2 - 2].filled = 'empty'

   let score = 0

   let move = (direction: Pair) => {
      if (Math.abs(direction.x) + Math.abs(direction.y) !== 1) throw new Error()

      return () => {
         player.x += direction.x
         player.y += direction.y

         if (
            player.x > 0 &&
            player.y > 0 &&
            wallGrid[player.y]?.[player.x]?.filled === 'empty'
         ) {
            player.x += direction.x
            player.y += direction.y
            render()
         } else {
            player.x -= direction.x
            player.y -= direction.y
         }
      }
   }

   input.left.subscribe(move({ x: -1, y: 0 }))
   input.right.subscribe(move({ x: 1, y: 0 }))
   input.up.subscribe(move({ x: 0, y: -1 }))
   input.down.subscribe(move({ x: 0, y: 1 }))

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
