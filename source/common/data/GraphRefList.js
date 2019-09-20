import { isBasicArray } from '@dr-js/core/module/common/check'
import { createTreeDepthFirstSearch } from '@dr-js/core/module/common/data/Tree'

// refList is nested list, the value should be all-ID (string) and subList (array)

__DEV__ && console.log({
  sampleRefList: [ 'K00', 'G00', [ 'K01',
    [ 'K02', 'D00', 'R00', [ 'K03', 'R000' ] ],
    [ 'K02', 'D01', 'R01', [ 'K03', 'R010' ] ]
  ] ]
})

// node: [ list, upperNode, index, lineIndex ]
const walkRefList = createTreeDepthFirstSearch((node) => {
  const [ list /* , upperNode, index, lineIndex */ ] = node
  let subNodeList
  for (let index = 0, indexMax = list.length; index < indexMax; index++) {
    const value = list[ index ]
    if (!isBasicArray(value)) continue
    const subNode = [ [ ...value ], node, index, 0 ]
    if (subNodeList !== undefined) subNodeList.push(subNode)
    else subNodeList = [ subNode ]
  }
  return subNodeList
})

const packRefList = (refList) => {
  const flatRefList = []
  let lineOffset = 0
  walkRefList(
    [ [ [ ...refList ] ], undefined, 0, 0 ],
    (node) => {
      node[ 3 ] = lineOffset
      const [ list, upperNode, index, lineIndex ] = node
      if (upperNode !== undefined) upperNode[ 0 ][ index ] = `+${lineIndex - upperNode[ 3 ]}`
      flatRefList.push(list)
      lineOffset++
    }
  )

  return flatRefList
    .map((list) => list.join(' '))
    .join('\n')
}

const parseRefList = (flatRefListString) => {
  const flatRefList = flatRefListString
    .split('\n')
    .map((string) => string.split(' '))

  flatRefList.forEach((list, lineIndex) => {
    for (let index = 0, indexMax = list.length; index < indexMax; index++) {
      const string = list[ index ]
      if (string.charAt(0) === '+') list[ index ] = flatRefList[ lineIndex + parseInt(string) ] // restore nested list
    }
  })

  return flatRefList[ 0 ] // refList
}

export {
  packRefList,
  parseRefList
}
