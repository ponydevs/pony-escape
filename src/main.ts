import { default as seedrandom } from 'seedrandom'
import { core } from './core/core'
import { getAsset } from './display/asset'
import { createDisplay } from './display/display'
import { createInput } from './input/input'
import { init } from './page/init'
import { spacelessURL } from './util/urlParam'

export let main = async () => {
   spacelessURL(location)

   let { canvas, config, revealLabyrinth$, setRevealButtonVisibility } = init({
      document,
      location,
   })

   let random = seedrandom(config.seed)
   let asset = await getAsset()
   let display = createDisplay({ asset, canvas, config })
   let input = createInput()

   core({
      config,
      display,
      input,
      random,
      revealLabyrinth$,
      setRevealButtonVisibility,
      size: {
         x: Math.round((config.size * 8) / 6),
         y: config.size,
      },
   })
}
