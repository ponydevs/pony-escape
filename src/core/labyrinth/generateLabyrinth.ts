import { createArray2d } from '../../util/array2d'
import { Square, Pair, WallSquare } from '../../type/ponyEscape'

export let generateLabyrinth = (size: Pair) => {
   let twiceSize = { x: size.x * 2, y: size.y * 2 }

   let grid = createArray2d<Square>(twiceSize, ({ y, x }) => {
      let isWall = () => (x + y) % 2 === 1
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

      let filled: WallSquare['filled'] = 'filled'
      if (isWall() && Math.random() > 0.35 && !isMapBorder()) {
         filled = 'empty'
      }

      return {
         type: 'wall',
         filled,
         visibility: 'visible',
      }
   })

   return grid
}
