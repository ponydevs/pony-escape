import { Subject } from 'rxjs'

export let createFingerMoveManager = ({ element }) => {
   let getTouches = (evt) => {
      return (
         // browser API ?? jQuery
         evt.touches ?? evt.originalEvent.touches
      )
   }

   let xDown = 0
   let yDown = 0

   let handleTouchStart = (evt) => {
      let firstTouch = getTouches(evt)[0]
      xDown = firstTouch.clientX
      yDown = firstTouch.clientY
   }

   let handleTouchMove = (evt) => {
      if (!xDown || !yDown) {
         return
      }

      let currentX = evt.touches[0].clientX
      let currentY = evt.touches[0].clientY

      let dx = xDown - currentX
      let dy = yDown - currentY

      let dist = dx ** 2 + dy ** 2

      if (dist < 80 ** 2) {
         return
      }

      if (Math.abs(dx) > Math.abs(dy)) {
         /*most significant*/
         if (dx > 0) {
            me.left.next()
         } else {
            me.right.next()
         }
      } else {
         if (dy > 0) {
            me.up.next()
         } else {
            me.down.next()
         }
      }

      xDown = currentX
      yDown = currentY
   }

   element.addEventListener('touchstart', handleTouchStart, false)
   element.addEventListener('touchmove', handleTouchMove, false)

   let removeAll = () => {
      element.removeEventListener('touchstart', handleTouchStart, false)
      element.removeEventListener('touchmove', handleTouchMove, false)
   }

   let me = {
      left: new Subject<void>(),
      right: new Subject<void>(),
      up: new Subject<void>(),
      down: new Subject<void>(),
      removeAll,
   }

   return me
}
