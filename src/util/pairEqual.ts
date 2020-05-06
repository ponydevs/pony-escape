import { Pair } from '../type/ponyEscape'

export let pairEqual = (a: Pair, b: Pair) => {
   return a.x === b.x && a.y === b.y
}
