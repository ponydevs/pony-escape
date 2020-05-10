import '@ui5/webcomponents/dist/Button'
import '@ui5/webcomponents/dist/Option'
import '@ui5/webcomponents/dist/Select'
import { fromEvent } from 'rxjs'
import { h } from './lib/hyper'

export interface ButtonSetProp {
   location: Location
   seed: string
}

let removeSeedParameter = (url: string): string => {
   return url.replace(/\?seed=[^?]*/g, '')
}

let removeModeParameter = (url: string): string => {
   let regexList = [
      /\?hide(=[^?]*)?/g,
      /\?hideDelay(=[^?]*)?/g,
      /\?justSmooze(=[^?]*)?/g,
      /\?smooze(=[^?]*)?/g,
      /\?smoozeDelay(=[^?]*)?/g,
   ]
   regexList.forEach((regex) => {
      url = url.replace(regex, '')
   })
   return url
}

let urlWithSeed = (prop: ButtonSetProp) => {
   let urlWithoutSeed = removeSeedParameter(prop.location.href)
   let destination = `${urlWithoutSeed}?seed=${prop.seed}`
   return destination
}

let willMatch = (regex: RegExp) => (text: string) => !!text.match(regex)

let testLabyrinthMode = (url: string) => {
   return removeModeParameter(url) === url
}

let BUTTON = 'ui5-button' as 'button'
let SELECT = 'ui5-select'
let OPTION = 'ui5-option' as 'option'

/**
 * The GameModeDropdown allows to select which mode the game should run in
 *
 * This reloads the page.
 */
let GameModeDropdown = (prop: ButtonSetProp) => {
   let { location } = prop

   let gameModeList: [string, string, (url: string) => boolean][] = [
      ['labyrinth', '', testLabyrinthMode],
      ['just smooze', '?justSmooze', willMatch(/\?justSmooze(\?|$)/)],
      ['hidden walls', '?hide', willMatch(/\?hide(\?|$)/)],
      ['smooze', '?smooze', willMatch(/\?smooze(\?|$)/)],
   ]

   let elem = h<HTMLSelectElement>(
      SELECT,
      {},
      gameModeList.map(([name, parameter, test]) => {
         let optionElem = h(OPTION, { textContent: name })
         if (test(location.href)) {
            optionElem.selected = true
         }
         optionElem.dataset.parameter = parameter
         return optionElem
      }),
   )

   elem.addEventListener(
      'change',
      (ev) => {
         console.log('ev', ev)
         let modeParameter = (ev as any).detail.selectedOption.dataset.parameter
         let urlWithSeedButNotMode = removeModeParameter(urlWithSeed(prop))
         location.assign(urlWithSeedButNotMode + modeParameter)
      },
      true,
   )

   return { elem }
}

/**
 * The NewGameButton allows to start a new game.
 *
 * This reloads the page.
 */
let NewGameButton = (prop: ButtonSetProp) => {
   let { location } = prop

   let onclick = () => {
      let destination = removeSeedParameter(location.href)
      location.assign(destination)
   }

   return { elem: h(BUTTON, { onclick, textContent: 'New Game' }) }
}

/**
 * The RestartSameButton allows to replay the same game.
 *
 * This reloads the page.
 */
let RestartSameButton = (prop: ButtonSetProp) => {
   let { location } = prop

   let onclick = () => {
      let destination = urlWithSeed(prop)
      location.assign(destination)
   }

   return { elem: h(BUTTON, { onclick, textContent: 'Restart Same' }) }
}

/**
 * This button is used to reveal the labyrinthe when it's hidden.
 */
let RevealLabyrintheButton = () => {
   let elem = h(BUTTON, { innerText: 'Reveal' })

   return {
      elem,
      click$: fromEvent(elem, 'click'),
   }
}

export let ButtonSet = (prop: ButtonSetProp) => {
   let revealButtonVisibility = false

   let gameModeDropDown = GameModeDropdown(prop)
   let newGameButton = NewGameButton(prop)
   let restartGameButton = RestartSameButton(prop)
   let revealLabyrinthButton = RevealLabyrintheButton()

   let elem = h(
      'span',
      {
         className: 'buttonSet',
      },
      [gameModeDropDown.elem, newGameButton.elem, restartGameButton.elem],
   )

   return {
      elem,
      revealLabyrinth$: revealLabyrinthButton.click$,
      setRevealButtonVisibility: (visibility: boolean) => {
         if (visibility === revealButtonVisibility) {
            return false
         }
         if (visibility === true) {
            elem.append(revealLabyrinthButton.elem)
         } else {
            revealLabyrinthButton.elem.remove()
         }
         revealButtonVisibility = visibility
      },
   }
}
