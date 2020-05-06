// Fisher-Yates / Knuth shuffle algorithm

export let shuffle = (array: unknown[]) => {
   for (let k = array.length - 1; k > 0; --k) {
      let kr = Math.floor(Math.random() * (k + 1))
         //
      ;[array[k], array[kr]] = [array[kr], array[k]]
   }
}
