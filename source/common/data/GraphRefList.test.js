import { stringifyEqual } from '@dr-js/core/module/common/verify'
import {
  packRefList,
  parseRefList
} from './GraphRefList'

const { describe, it } = global

const sampleRefList = [ 'graph', 'G00', [ 'exprList',
  [ 'defineConst', 'D00', 'R00', [ 'resId', 'R000' ] ],
  [ 'defineConst', 'D01', 'R01', [ 'resId', 'R010' ] ],
  [ 'defineConst', 'D02', 'R02', [ 'array', [ 'exprList',
    [ 'resId', 'R000' ],
    [ 'resId', 'R020' ]
  ] ] ],
  [ 'defineConst', 'D03', 'R03', [ 'resId', 'R030' ] ],
  [ 'defineConst', 'D04', 'R04', [ 'struct', [ 'exprList',
    [ 'structEntry', [ 'exprList', [ 'resId', 'R040' ], [ 'resId', 'R000' ] ] ],
    [ 'structEntry', [ 'exprList', [ 'resId', 'R041' ], [ 'resId', 'R042' ] ] ],
    [ 'structEntry', [ 'exprList', [ 'resId', 'R043' ], [ 'resId', 'R044' ] ] ]
  ] ] ],
  [ 'defineConst', 'D05', 'R05', [ 'resId', 'R050' ] ]
] ]

const sampleRefListString = `graph G00 +1
exprList +1 +3 +5 +10 +12 +27
defineConst D00 R00 +1
resId R000
defineConst D01 R01 +1
resId R010
defineConst D02 R02 +1
array +1
exprList +1 +2
resId R000
resId R020
defineConst D03 R03 +1
resId R030
defineConst D04 R04 +1
struct +1
exprList +1 +5 +9
structEntry +1
exprList +1 +2
resId R040
resId R000
structEntry +1
exprList +1 +2
resId R041
resId R042
structEntry +1
exprList +1 +2
resId R043
resId R044
defineConst D05 R05 +1
resId R050`

describe('Common.Data.GraphRefList', () => {
  it('packRefList()', () => {
    stringifyEqual(packRefList(sampleRefList), sampleRefListString)
  })

  it('parseRefList()', () => {
    stringifyEqual(parseRefList(sampleRefListString), sampleRefList)
  })
})
