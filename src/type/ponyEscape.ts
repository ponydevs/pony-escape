import { Observable } from 'rxjs'

export interface PonyInput {
   left: Observable<void>
   right: Observable<void>
   up: Observable<void>
   down: Observable<void>
   removeAll: () => void
}

export interface PonyCore {
   tick: (delta: number) => void
}

export interface PonyDisplay {
   render: (prop: PonyRenderProp) => void
}

export interface PonyRenderProp {
   grid: Square[][]
   player: Player
   monster: Monster | undefined
   screen: 'play' | 'score'
   score: number
}

export type Square = ExteriorSquare | GroundSquare | WallSquare

export interface ExteriorSquare {
   type: 'exterior'
}

export interface GroundSquare {
   type: 'ground'
}

export interface WallSquare {
   type: 'wall'
   filled: 'filled' | 'empty'
   visibility: 'visible' | 'invisible'
}

export interface Player extends Pair {}

export interface Monster extends Pair {}

export interface Pair {
   x: number
   y: number
}

export interface WHPair {
   width: number
   height: number
}

// export interface Rect {
//    x: number
//    y: number
//    width: number
//    height: number
// }
