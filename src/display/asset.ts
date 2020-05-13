import monsterUrl from '../../asset/monster/monster-smooze-A.png'
import playerUrl from '../../asset/player/rarity-930-1.png'
import { promiseObjectAll } from '../util/promise'
import { loadImage } from './loadImage'

export interface Asset {
   monster: HTMLImageElement
   player: HTMLImageElement
}

export let getAsset = async (): Promise<Asset> => {
   return promiseObjectAll<Asset>({
      monster: loadImage(monsterUrl),
      player: loadImage(playerUrl),
   })
}
