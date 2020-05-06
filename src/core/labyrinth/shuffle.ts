// Fisher-Yates / Knuth shuffle algorithm

import { prng } from '../../lib/seedrandom'

export let shuffle = (random: prng, array: unknown[]) => {
   for (let k = array.length - 1; k > 0; --k) {
      let kr = Math.floor(random() * (k + 1))
         //
      ;[array[k], array[kr]] = [array[kr], array[k]]
   }
}
