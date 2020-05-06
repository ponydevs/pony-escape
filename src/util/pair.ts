import { Pair } from '../type/ponyEscape'

export let pairEqual = (a: Pair, b: Pair) => {
   return a.x === b.x && a.y === b.y
}

export let pairAdd = (a: Pair, b: Pair) => {
   return {
      x: a.x + b.x,
      y: a.y + b.y,
   }
}

export let pairScale = (a: Pair, r: number) => {
   return {
      x: a.x * r,
      y: a.y * r,
   }
}

export let pairToString = ({ x, y }: Pair) => `${x},${y}`

export let pairFromString = (text: string) => {
   let [xx, yy] = text.split(',')
   return {
      x: +xx,
      y: +yy,
   }
}
