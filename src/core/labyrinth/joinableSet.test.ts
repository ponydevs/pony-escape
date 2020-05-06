import { default as ava } from 'ava'

import * as joinable from './joinableSet'

ava('Joining joinables', (t) => {
   let a = joinable.create()
   let b = joinable.create()
   let c = joinable.create()

   t.is(joinable.size(a), 1)
   t.false(joinable.sameSet(a, b))

   joinable.join(a, b)

   t.assert(joinable.sameSet(a, b))
   t.false(joinable.sameSet(a, c))
   t.false(joinable.sameSet(b, c))
   t.is(joinable.size(a), 2)
   t.is(joinable.size(b), 2)

   joinable.join(a, b)

   t.assert(joinable.sameSet(a, b))
   t.is(joinable.size(a), 2)
   t.is(joinable.size(b), 2)

   joinable.join(a, c)
   t.assert(joinable.sameSet(a, b))
   t.assert(joinable.sameSet(a, c))
   t.assert(joinable.sameSet(b, c))
   t.is(joinable.size(a), 3)
   t.is(joinable.size(b), 3)
   t.is(joinable.size(c), 3)
})
