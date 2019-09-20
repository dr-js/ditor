import { stringifyEqual } from 'dr-js/module/common/verify'
import {
  ID_KEYWORD,
  ID_DEF,
  ID_REF,

  packId,
  parseId
} from './GraphType'

const { describe, it } = global

describe('Common.Data.GraphType', () => {
  it('packId()', () => {
    stringifyEqual(packId({ type: ID_KEYWORD, id: 123456 }), 'K2n9c')
    stringifyEqual(packId({ type: ID_DEF, id: 123456 }), 'D2n9c')
    stringifyEqual(packId({ type: ID_REF, id: 123456 }), 'R2n9c')
  })

  it('parseId()', () => {
    stringifyEqual(parseId('K2n9c'), { type: ID_KEYWORD, id: 123456 })
    stringifyEqual(parseId('D2n9c'), { type: ID_DEF, id: 123456 })
    stringifyEqual(parseId('R2n9c'), { type: ID_REF, id: 123456 })
  })
})
