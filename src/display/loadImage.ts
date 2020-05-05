import { h } from '../page/lib/hyper'

/**
 * Load an image, encapsulated in a promise which garantees that the loading
 * has completed.
 *
 * @param url url of the image
 */
export let loadImage = async (url: string): Promise<HTMLImageElement> => {
   let resolve

   let onload = () => resolve()

   let image = h('img', { onload, src: url })

   await new Promise((resFunc) => {
      resolve = resFunc
   })

   return image
}
