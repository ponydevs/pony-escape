import { Pair } from '../type/ponyEscape'

export let createArray2d = <T>(
   size: Pair,
   fillFunction: (pos: Pair) => T,
): T[][] => {
   let { x: sizex, y: sizey } = size
   return Array.from({ length: sizey }, (_, y) => {
      return Array.from({ length: sizex }, (_, x) => fillFunction({ y, x }))
   })
}
