import { core } from './core/core'
import { getAsset } from './display/asset'
import { createDisplay } from './display/display'
import { createInput } from './input/input'
import { init } from './page/init'
import { getUrlParam } from './util/urlParam'
import { PonyEscapeConfig } from './ponyEscapeConfig'

export let main = async () => {
   let { canvas } = init()
   let asset = await getAsset()
   let display = createDisplay({ asset, canvas })
   let input = createInput()

   let config = getUrlParam<PonyEscapeConfig>(location, {
      smooze: () => false,
      easy: () => false,
      hard: () => false,
      size: ({ easy, hard, smooze }) => {
         let difficulty = easy() ? 0 : hard() ? 2 : 1
         return (smooze() ? [6, 7, 9] : [12, 15, 21])[difficulty]
      },
      cycle: () => -1,
      maxCycleSize: ({ cycle, size }) => {
         if (cycle() >= 0) {
            return cycle() * cycle() * size()
         } else {
            return 0
         }
      },
      cycleRejectionFrequency: () => 0,
   })

   core(
      {
         display,
         input,
         size: {
            x: Math.round((config.size * 8) / 6),
            y: config.size,
         },
      },
      config,
   )
}
