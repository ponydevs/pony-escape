import { Subject } from 'rxjs'

// based on https://stackoverflow.com/a/23230280/9878263

export let createSwipeManager = ({ element }) => {
   let xDown = 0
   let yDown = 0

   let getTouches = (evt) => {
      return (
         // browser API ?? jQuery
         evt.touches ?? evt.originalEvent.touches
      )
   }

   let handleTouchStart = (evt) => {
      const firstTouch = getTouches(evt)[0]
      xDown = firstTouch.clientX
      yDown = firstTouch.clientY
   }

   let handleTouchMove = (evt) => {
      if (!xDown || !yDown) {
         return
      }

      var xUp = evt.touches[0].clientX
      var yUp = evt.touches[0].clientY

      var xDiff = xDown - xUp
      var yDiff = yDown - yUp

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
         /*most significant*/
         if (xDiff > 0) {
            me.left.next()
         } else {
            me.right.next()
         }
      } else {
         if (yDiff > 0) {
            me.up.next()
         } else {
            me.down.next()
         }
      }
      /* reset values */
      xDown = 0
      yDown = 0
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
