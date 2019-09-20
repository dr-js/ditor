// TODO: check JS Number.MAX_SAFE_INTEGER (radix16: 1fffffffffffff | radix36: 2gosa7pa2gv)?

const ID_KEYWORD = 'ID_KEYWORD'
const ID_DEF = 'ID_DEF'
const ID_REF = 'ID_REF'

const PREFIX_KEYWORD = 'K'
const PREFIX_DEF = 'D'
const PREFIX_REF = 'R'

const ID_PREFIX_MAP = {
  [ ID_KEYWORD ]: PREFIX_KEYWORD,
  [ ID_DEF ]: PREFIX_DEF,
  [ ID_REF ]: PREFIX_REF
}

const PREFIX_ID_MAP = {
  [ PREFIX_KEYWORD ]: ID_KEYWORD,
  [ PREFIX_DEF ]: ID_DEF,
  [ PREFIX_REF ]: ID_REF
}

const packId = ({ type, id }) => `${ID_PREFIX_MAP[ type ]}${id.toString(36)}`
const parseId = (string = '') => ({ type: PREFIX_ID_MAP[ string.charAt(0) ], id: parseInt(string.slice(1), 36) })

const GRAPH_KEYWORD_VALUE_MAP = {
  exprList: 0x01,
  resId: 0x02,

  graph: 0x11,
  graphDependency: 0x12,
  defineConst: 0x13,
  defineLet: 0x14,
  array: 0x15,
  struct: 0x16,
  structEntry: 0x17,

  assign: 0x21,
  invoke: 0x22,
  scope: 0x23,
  scopeCapture: 0x24,
  function: 0x25,
  functionArgument: 0x26,
  functionReturn: 0x27
}

export {
  ID_KEYWORD,
  ID_DEF,
  ID_REF,

  packId,
  parseId,

  GRAPH_KEYWORD_VALUE_MAP
}
