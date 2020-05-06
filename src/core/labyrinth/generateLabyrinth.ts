import { createArray2d } from '../../util/array2d'
import { Square, WallSquare } from '../../type/ponyEscape'
import { kruskal } from './kruskal'
import { shuffle } from './shuffle'
import { LoadProp } from '../core'

export interface LocalizedWall<TData> {
   x: number
   y: number
   wall: TData
}

export let generateLabyrinth = (prop: LoadProp) => {
   let { config, size, random } = prop

   let twiceSize = { x: size.x * 2, y: size.y * 2 }

   let oddWallList: LocalizedWall<WallSquare>[] = []
   let evenWallList: LocalizedWall<WallSquare>[] = []

   let grid = createArray2d<Square>(twiceSize, ({ y, x }) => {
      let isOddWall = () => (x + y) % 2 === 1
      let isGround = () => x % 2 === 1 && y % 2 === 1
      let isMapBorder = () => {
         return x <= 0 || y <= 0 || x >= twiceSize.x - 2 || y >= twiceSize.y - 2
      }

      if (x >= size.x * 2 - 1 || y >= size.y * 2 - 1) {
         // bottom and right side shall be left unused
         return {
            type: 'exterior',
         }
      }

      if (isGround()) {
         return {
            type: 'ground',
         }
      }

      let me: WallSquare = {
         type: 'wall',
         filled: 'filled',
         visibility: 'visible',
      }

      if (!isMapBorder()) {
         if (isOddWall()) {
            oddWallList.push({ x, y, wall: me })
         } else {
            evenWallList.push({ x, y, wall: me })
         }
      }

      return me
   })

   let shuffledOddWalllist = oddWallList

   shuffle(random, shuffledOddWalllist)

   let smallEnough

   if (config.maxCycleSize > 0) {
      smallEnough = (setSize: number) => {
         return (
            random() >= config.cycleRejectionFrequency &&
            setSize <= config.maxCycleSize
         )
      }
   }

   let selectedWallList = kruskal({
      linkList: oddWallList,
      getNodePair: (wall: LocalizedWall<WallSquare>) => {
         // if (wall.y == 2 && wall.x == 1) debugger

         if (wall.x % 2 === 0) {
            return [grid[wall.y][wall.x - 1], grid[wall.y][wall.x + 1]]
         } else if (wall.y % 2 === 0) {
            return [grid[wall.y - 1][wall.x], grid[wall.y + 1][wall.x]]
         } else throw new Error()
      },
      smallEnough,
   })

   selectedWallList.forEach(({ wall }) => {
      wall.filled = 'empty'
   })

   return { grid, oddWallList, evenWallList }
}
