import { Observable, Subject } from 'rxjs'
import { PonyInput } from '../type/ponyEscape'
import { createKeyboardManager } from './keyboardManager'
import { createSwipeManager } from './swipeManager'

export let createInput = (): PonyInput => {
   let keyboard = createKeyboardManager({
      element: document.body,
      evPropName: 'key',
   })

   let swipeManager = createSwipeManager({
      element: document.body,
   })

   let makeObservable = (key: string, swipe: Subject) => {
      return new Observable<void>((subscriber) => {
         let callback = () => subscriber.next()
         let subS = swipe.subscribe(callback)
         let subK = keyboard.onKeydown(key, callback)
         return () => {
            subK.remove()
            subS.remove(subS)
         }
      })
   }

   return {
      left: makeObservable('ArrowLeft', swipeManager.left),
      right: makeObservable('ArrowRight', swipeManager.right),
      up: makeObservable('ArrowUp', swipeManager.up),
      down: makeObservable('ArrowDown', swipeManager.down),
      removeAll: () => {
         keyboard.removeAll()
         swipeManager.removeAll()
      },
   }
}
