import { Observable } from 'rxjs'
import { PonyInput } from '../type/ponyEscape'
import { createKeyboardManager } from './keyboardManager'

export let createInput = (): PonyInput => {
   let keyboard = createKeyboardManager({
      element: document.body,
      evPropName: 'key',
   })

   return {
      left: new Observable<undefined>((subscriber) => {
         let handle = keyboard.onKeydown('ArrowLeft', () => subscriber.next())
         return handle.remove
      }),
      right: new Observable<undefined>((subscriber) => {
         let handle = keyboard.onKeydown('ArrowRight', () => subscriber.next())
         return handle.remove
      }),
      up: new Observable<undefined>((subscriber) => {
         let handle = keyboard.onKeydown('ArrowUp', () => subscriber.next())
         return handle.remove
      }),
      down: new Observable<undefined>((subscriber) => {
         let handle = keyboard.onKeydown('ArrowDown', () => subscriber.next())
         return handle.remove
      }),
      removeAll: () => {
         keyboard.removeAll()
      },
   }
}
