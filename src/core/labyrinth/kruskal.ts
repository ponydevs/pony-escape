import * as joinable from './joinableSet'

export interface KruskalProp<TNode, TLink> {
   linkList: TLink[]
   getNodePair: (link: TLink) => [TNode, TNode]
   smallEnough?: (setSize: number) => boolean
}

export let kruskal = <TNode, TLink>(
   prop: KruskalProp<TNode, TLink>,
): TLink[] => {
   let setMap = new Map()
   let { smallEnough = () => false } = prop

   let getSet = (node: TNode) => {
      let joinableSet = setMap.get(node)

      if (joinableSet === undefined) {
         joinableSet = joinable.create()

         setMap.set(node, joinableSet)
      }

      return joinableSet
   }

   let selectedLinkList: TLink[] = []

   prop.linkList.forEach((link) => {
      let [na, nb] = prop.getNodePair(link)
      let sa = getSet(na)
      let sb = getSet(nb)

      if (!joinable.sameSet(sa, sb)) {
         selectedLinkList.push(link)
         joinable.join(sa, sb)
      } else if (smallEnough(joinable.size(sa))) {
         selectedLinkList.push(link)
      }
   })

   return selectedLinkList
}
