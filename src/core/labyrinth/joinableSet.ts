export interface Set {
   _emissary: Set
   _size: number
}

let emissary = (a: Set) => {
   // find the final emissary
   let e = a
   while (e !== e._emissary) {
      e = e._emissary
   }
   let final = e

   // set all intermediate nodes to point directly to the final emissary
   let ee = a
   while (ee !== ee._emissary) {
      e = ee
      ee = ee._emissary
      e._emissary = final
   }

   return final
}

export let create = () => {
   let me: Set = {
      _size: 1,
   } as any
   me._emissary = me
   return me
}

export let join = (a: Set, b: Set) => {
   if (sameSet(a, b)) return
   let total = emissary(a)._size + emissary(b)._size
   emissary(b)._emissary = emissary(a)
   emissary(a)._size = total
}

export let sameSet = (a: Set, b: Set) => {
   return emissary(a) === emissary(b)
}

export let size = (a: Set) => {
   return emissary(a)._size
}
