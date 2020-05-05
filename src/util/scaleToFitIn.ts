import { Pair, WHPair } from '../type/ponyEscape'

export let scaleToFitIn = (image: WHPair, squareSize: Pair) => {
   let ratio = Math.min(squareSize.x / image.width, squareSize.y / image.height)

   let w = image.width * ratio
   let h = image.height * ratio

   return {
      w,
      h,
      x: Math.max(0, squareSize.x - w) / 2,
      y: Math.max(0, squareSize.y - h) / 2,
      ratio,
   }
}
