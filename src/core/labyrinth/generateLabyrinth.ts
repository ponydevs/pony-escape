import { createArray2d } from '../../util/array2d'
import { Square, Pair, WallSquare } from '../../type/ponyEscape'

export let generateLabyrinth = (size: Pair) => {
   let twiceSize = { x: size.x * 2, y: size.y * 2 }

   let grid = createArray2d<Square>(twiceSize, ({ y, x }) => {
      let isBorder = () => (x + y) % 2 === 1
      let isGround = () => x % 2 === 1 && y % 2 === 1

      if (x >= size.x * 2 - 1 || y >= size.y * 2 - 1) {
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
      if (isBorder() && Math.random() > 0.4) {
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
