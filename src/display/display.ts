import { Pair, PonyDisplay, PonyRenderProp } from '../type/ponyEscape'
import { PonyEscapeConfig } from '../type/ponyEscapeConfig'
import { getContext2d } from '../util/getContext2d'
import { scaleToFitIn } from '../util/scaleToFitIn'
import { Asset } from './asset'
import { albescent, black, coal, white } from './color'

export interface PonyDisplayProp {
   asset: Asset
   canvas: HTMLCanvasElement
   config: PonyEscapeConfig
}

export interface ScorePosition {
   x: number
   y: number
   scale: number
}

export let createDisplay = (prop: PonyDisplayProp): PonyDisplay => {
   let { asset, canvas, config } = prop
   let ctx = getContext2d(canvas)

   let getGridSize = (grid: PonyRenderProp['grid']): Pair => {
      if (!(grid.length > 0)) throw new Error()

      return {
         x: grid[0].length,
         y: grid.length,
      }
   }

   let getSquareSize = (gridSize: Pair): Pair => {
      return {
         x: 800 / gridSize.x,
         y: 600 / gridSize.y,
      }
   }

   let renderGrid = async (grid: PonyRenderProp['grid'], gridSize: Pair) => {
      let image = new ImageData(gridSize.x, gridSize.y)
      let { data } = image

      grid.forEach((line, ky) => {
         let kky = 4 * line.length * ky
         line.forEach((square, kx) => {
            let kk = kky + 4 * kx
            let color: number[]
            if (square.type === 'exterior') {
               color = black
            } else if (square.type === 'ground') {
               color = coal
            } else if (square.visibility === 'invisible') {
               color = albescent
            } else if (square.filled === 'filled') {
               color = white
            } else {
               color = coal
            }
            ;[data[kk + 0], data[kk + 1], data[kk + 2]] = color
            data[kk + 3] = 255
         })
      })

      let bitmap = await createImageBitmap(image)
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(bitmap, 0, 0, 800, 600)
   }

   let renderCharacter = (
      character: Pair,
      squareSize: Pair,
      which: 'player' | 'monster',
   ) => {
      let image = asset[which]

      let fit = scaleToFitIn(image, squareSize)

      let dx = character.x * squareSize.x
      let dy = character.y * squareSize.y
      if (config.highlight) {
         ctx.strokeStyle = 'red'
         ctx.strokeRect(dx, dy, squareSize.x, squareSize.y)
      }
      ctx.drawImage(image, dx + fit.x, dy + fit.y, fit.w, fit.h)
   }

   let renderScore = (
      score: PonyRenderProp['score'],
      scorePos: ScorePosition,
   ) => {
      let { x, y, scale } = scorePos

      let FONT_FAMILY = 'Anton, Impact, "Arial Bold"'
      ctx.font = `${32 * scale}px ${FONT_FAMILY}`
      ctx.fillStyle = 'white'
      ctx.strokeStyle = 'black'

      let text = `${score}`
      if (score === 'victory') {
         text = 'You escaped!'
      } else if (score === 'defeat-plus') {
         text = "You've escaped!"
      } else if (score === 'defeat') {
         text = "You've been smoozed!"
      }
      ctx.lineWidth = 5
      ctx.strokeText(text, x, y)
      ctx.fillText(text, x, y)
   }

   let render = async (prop: PonyRenderProp): Promise<void> => {
      let gridSize = getGridSize(prop.grid)
      let squareSize = getSquareSize(gridSize)

      await renderGrid(prop.grid, gridSize)
      renderCharacter(prop.player, squareSize, 'player')
      if (prop.monster !== undefined) {
         renderCharacter(prop.monster, squareSize, 'monster')
      }

      if (prop.screen === 'score') {
         renderScore(prop.score, { x: 210, y: 300, scale: 2 })
      }
   }

   let me: PonyDisplay = {
      render,
   }

   return me
}
