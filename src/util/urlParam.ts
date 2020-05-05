export let getUrlParam = <T>(location: Location, defaultConfig: T) => {
   let config = {
      ...defaultConfig,
   }

   let pieceList = location.search.split('?').slice(1)

   pieceList.forEach((piece) => {
      let key: string
      let valueList: string[]
      let value
      if (piece.includes('=')) {
         ;[key, ...valueList] = piece.split('=')
         value = valueList.join('=')
         if (!isNaN(value)) {
            value = +value
         }
      } else {
         key = piece
         value = true
      }

      if (!(key in config) || typeof config[key] === typeof value) {
         config[key] = value
      }
   })

   return config
}
