import { prng } from '../lib/seedrandom'
import { PonyEscapeConfig } from '../ponyEscapeConfig'
import {
   Pair,
   Player,
   PonyDisplay,
   PonyInput,
   WallSquare,
} from '../type/ponyEscape'
import { w } from '../util/window'
import { generateLabyrinth } from './labyrinth/generateLabyrinth'

export interface LoadProp {
   config: PonyEscapeConfig
   display: PonyDisplay
   input: PonyInput
   random: prng
   size: Pair
}

export let core = (prop: LoadProp) => {
   let { config, display, input, size } = prop

   let { grid, oddWallList, evenWallList } = generateLabyrinth(prop)
   let wallGrid = grid as WallSquare[][]

   w.grid = grid

   let player: Player = {
      x: 1,
      y: Math.floor(size.y / 4) * 2 + 1,
   }

   wallGrid[player.y][0].filled = 'empty'
   wallGrid[size.y * 2 - player.y][size.x * 2 - 2].filled = 'empty'

   let score = 0
   let moveCount = 0

   let hideAllWalls = () => {
      if (!config.hide) return
      oddWallList.forEach(({ wall }) => {
         wall.visibility = 'invisible'
      })
      evenWallList.forEach(({ wall }) => {
         wall.visibility = 'invisible'
      })
   }

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
            wallGrid[player.y][player.x].visibility = 'visible'
            player.x += direction.x
            player.y += direction.y
            render()
            moveCount += 1
         } else {
            player.x -= direction.x
            player.y -= direction.y
         }

         if (moveCount === 4) {
            hideAllWalls()
            render()
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
