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
import { pairEqual } from '../util/pair'

export interface LoadProp {
   config: PonyEscapeConfig
   display: PonyDisplay
   input: PonyInput
   random: prng
   size: Pair
}

export let core = (prop: LoadProp) => {
   let { config, display, input, size } = prop

   let {
      grid,
      wallGrid,
      dijkstra,
      oddWallList,
      evenWallList,
   } = generateLabyrinth(prop)
   let screen: 'play' | 'score' = 'play'

   w.grid = grid

   let player: Player = {
      x: 1,
      y: Math.ceil(size.y / 4) * 2 - 1,
   }

   let destination: Pair = {
      x: size.x * 2 - 1,
      y: 2 * size.y - 2 - player.y,
   }

   wallGrid[player.y][0].filled = 'empty'
   wallGrid[destination.y][destination.x - 1].filled = 'empty'

   let moveCount = 0

   let hideAllWalls = () => {
      oddWallList.forEach(({ wall }) => {
         wall.visibility = 'invisible'
      })
      evenWallList.forEach(({ wall }) => {
         wall.visibility = 'invisible'
      })
   }

   /**
    * move
    * Let the player do a move
    *
    * @param direction The delta Pair that leads the player to an odd wall
    */
   let move = (direction: Pair) => {
      let moveCounteIncrement = false
      let needsRender = false
      let destinationReached = false

      if (pairEqual(player, destination) && direction.x === 1) {
         destinationReached = true
      }

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
         needsRender = true
         moveCounteIncrement = true
      } else if (destinationReached) {
         needsRender = true
         screen = 'score'
      } else {
         player.x -= direction.x
         player.y -= direction.y
      }

      moveCount += +moveCounteIncrement

      if (moveCount === config.hideDelay) {
         hideAllWalls()
         needsRender = true
      }
      if (moveCount > config.smoozeDelay) {
      }
      if (needsRender) {
         render()
      }
   }

   /**
    * move_
    *
    * Prepare a move for the given delta
    *
    * @param direction The delta Pair; see `move()`
    */
   let move_ = (direction: Pair) => {
      if (Math.abs(direction.x) + Math.abs(direction.y) !== 1) throw new Error()
      return () => move(direction)
   }

   input.left.subscribe(move_({ x: -1, y: 0 }))
   input.right.subscribe(move_({ x: 1, y: 0 }))
   input.up.subscribe(move_({ x: 0, y: -1 }))
   input.down.subscribe(move_({ x: 0, y: 1 }))

   let render = () => {
      display.render({
         grid,
         monster: undefined,
         player,
         score: -1,
         screen,
      })
   }

   render()
}
