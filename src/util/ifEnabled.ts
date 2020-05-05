// https://github.com/mathieucaroff/pixelpony/blob/b2909b65d1/package/client/src/pagetool/ifEnabled.ts
// modified `hashhas` into `queryHas`, now testing for `?word`

export let ifEnabled = (longName, shortName = '') => {
   let queryHas = (word) => {
      let { href } = location
      let text = `?${word}`
      return href.endsWith(text) || href.includes(`${text}?`)
   }

   let test = () => {
      let result: boolean | undefined = window[longName] as any
      if (result === undefined && queryHas(longName)) {
         result = true
      }
      if (result === undefined && shortName && queryHas(shortName)) {
         result = true
      }
      if (result !== true) {
         result = false
      }
      return result
   }

   return {
      do: (callback) => {
         if (test()) {
            console.log(`?${longName}`)
            callback()
         }
      },
   }
}
