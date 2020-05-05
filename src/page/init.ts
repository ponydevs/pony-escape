import { h } from './lib/hyper'

export let init = () => {
   let canvas = h('canvas')
   canvas.width = 800
   canvas.height = 600

   document.body.appendChild(
      h('h1', {
         textContent: document.title,
      }),
   )

   document.body.appendChild(canvas)

   return { canvas }
}
