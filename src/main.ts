import { default as seedrandom } from 'seedrandom'

import { core } from './core/core'
import { getAsset } from './display/asset'
import { createDisplay } from './display/display'
import { createInput } from './input/input'
import { init } from './page/init'
import { PonyEscapeConfig } from './ponyEscapeConfig'
import { randomSeed } from './util/randomSeed'
import { getUrlParam } from './util/urlParam'

export let main = async () => {
   let { canvas } = init()
   let asset = await getAsset()
   let display = createDisplay({ asset, canvas })
   let input = createInput()

   let config = getUrlParam<PonyEscapeConfig>(location, {
      seed: () => randomSeed(),
      smooze: () => false,
      easy: () => false,
      hard: () => false,
      hide: ({ smooze }) => smooze(),
      size: ({ easy, hard, hide }) => {
         let difficulty = easy() ? 0 : hard() ? 2 : 1
         return (hide() ? [7, 8, 10] : [12, 15, 21])[difficulty]
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

   console.info(`?seed=${config.seed}`)

   let random = seedrandom(config.seed)

   core({
      config,
      display,
      input,
      random,
      size: {
         x: Math.round((config.size * 8) / 6),
         y: config.size,
      },
   })
}
