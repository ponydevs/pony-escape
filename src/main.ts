import { core } from './core/core'
import { getAsset } from './display/asset'
import { createDisplay } from './display/display'
import { createInput } from './input/input'
import { init } from './page/init'
import { getUrlParam } from './util/urlParam'

export let main = async () => {
   let { canvas } = init()
   let asset = await getAsset()
   let display = createDisplay({ asset, canvas })
   let input = createInput()

   let param = getUrlParam(location, { size: 5 })

   core({
      display,
      input,
      size: {
         x: Math.round((param.size * 8) / 6),
         y: param.size,
      },
   })
}
