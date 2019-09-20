import { stringifyEqual } from 'dr-js/module/common/verify'
import { BASIC_EXTENSION_MAP } from 'dr-js/module/common/module/MIME'
import {
  packResMap,
  parseResMap
} from './GraphResMap'

const { describe, it } = global

const sampleResMap = new Map(Object.entries({
  // basic value as JSON
  R00: 'string',
  R01: 1234,
  R02: true,
  R03: [ 'string', 1234, true ],

  // complex value as JSON (object) or dataUri (binary)
  R10: { type: 'object', value: { key: 'value' } },
  R11: { type: 'binary', value: new ArrayBuffer(8) },
  R13: { type: 'file', value: new ArrayBuffer(8), mime: BASIC_EXTENSION_MAP.png, name: 'file.png' },

  // TODO: maybe useful, as plugin?
  R14: { type: 'plugin:url', value: 'https://a.b/c' },
  R16: { type: 'plugin:repo', value: 'github:dr-js/dr-js' },
  R15: { type: 'plugin:package.json', value: { name: 'name', version: '0.0.0' } }
}))

const sampleResString = `R00: "string"
R01: 1234
R02: true
R03: ["string",1234,true]
R10: data:type=object,%7B%22key%22%3A%22value%22%7D
R11: data:type=binary;base64,AAAAAAAAAAA=
R13: data:image/png;type=file;name=file.png;base64,AAAAAAAAAAA=
R14: data:type=plugin%3Aurl,https%3A%2F%2Fa.b%2Fc
R16: data:type=plugin%3Arepo,github%3Adr-js%2Fdr-js
R15: data:type=plugin%3Apackage.json,%7B%22name%22%3A%22name%22%2C%22version%22%3A%220.0.0%22%7D`

describe('Common.Data.GraphResMap', () => {
  it('packResMap()', () => {
    stringifyEqual(packResMap(sampleResMap), sampleResString)
  })

  it('parseResMap()', () => {
    stringifyEqual(parseResMap(sampleResString), sampleResMap)
  })
})
