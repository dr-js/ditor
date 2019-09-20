import { isBasicObject } from 'dr-js/module/common/check'
import { BASIC_EXTENSION_MAP } from 'dr-js/module/common/module/MIME'
import { encode, decode } from 'dr-js/module/common/data/DataUri'

// basic types

__DEV__ && console.log({
  sampleResMap: new Map(Object.entries({
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
})

const packResMap = (resMap = new Map()) => {
  const stringList = []
  for (const [ key, resValue ] of resMap) {
    let valueString
    if (!isBasicObject(resValue)) valueString = JSON.stringify(resValue) // basic value as JSON
    else {
      const { type, value, mime, name } = resValue
      const isJSON = type === 'object' || type === 'plugin:package.json'
      valueString = encode({ value: isJSON ? JSON.stringify(value) : value, mime, paramMap: name ? { type, name } : { type } }) // complex value as JSON (object) or dataUri (binary)
    }
    stringList.push(`${key}: ${valueString}`)
  }
  return stringList.join('\n')
}

const parseResMap = (string = '') => {
  const resMap = new Map()
  const stringList = string.split('\n').filter(Boolean)
  for (const string of stringList) {
    const [ key, ...valueStringList ] = string.split(': ')
    const valueString = valueStringList.length >= 2 ? valueStringList.join(': ') : valueStringList[ 0 ]
    let resValue
    if (!valueString.startsWith('data:')) resValue = JSON.parse(valueString)
    else {
      const { value, mime, paramMap: { type, name } } = decode(valueString)
      const isJSON = type === 'object' || type === 'plugin:package.json'
      resValue = { type, value: isJSON ? JSON.parse(value) : value, mime, name }
    }
    resMap.set(key, resValue)
  }
  return resMap
}

export {
  packResMap,
  parseResMap
}
