// function create()
// from
// https://github.com/mathieucaroff/xadom/blob/37570300c7/src/util/xaUtil.ts

import { deepUpdate } from '../../util/deepUpdate'

/**
 * create an HTML Element
 *
 * @param name The html name of the element to create
 * @param attribute An object associating keys to values for the created element
 * @param children An array of children elements
 */
function h<K extends keyof HTMLElementTagNameMap>(
   name: K,
   attribute?: Partial<HTMLElementTagNameMap[K]> & Record<string, any>,
   children?: Element[],
): HTMLElementTagNameMap[K]

function h<T extends Element = HTMLElement>(
   name: string,
   attribute?: Record<string, any>,
   children?: Element[],
): T

function h<K extends keyof HTMLElementTagNameMap>(
   name: K,
   attribute: Partial<HTMLElementTagNameMap[K]> & Record<string, any> = {},
   children: Element[] = [],
) {
   let elem = document.createElement<K>(name)

   Object.entries(attribute).forEach(([name, value]) => {
      if (elem[name] !== undefined) {
         elem[name] = value
      } else {
         elem.setAttribute(name, value)
      }
   })

   children.forEach((child) => {
      elem.appendChild(child)
   })

   return elem
}

export { h }
