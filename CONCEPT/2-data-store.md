## Data Store 

So how **graph data** should be saved?

since the data is 2 part:
- a nested list of code graph (syntax)
- a map of resource

With the sample graph data from `syntax - define` as the example
```lisp
(graph G00 (exprList
  (defineConst D00 R00 (resId R000))
  (defineConst D01 R01 (resId R010))
  (defineConst D02 R02 (array (exprList
    (resId R000)
    (resId R020)
  )))
  (defineConst D03 R03 (resId R030))
  (defineConst D04 R04 (struct (exprList 
    (structEntry (exprList (resId R040) (resId R000)))
    (structEntry (exprList (resId R041) (resId R042)))
    (structEntry (exprList (resId R043) (resId R044)))
  )))
  (defineConst D05 R05 (resId R050))
))

;; resMap
;;   R00:  'DATA_NUMBER'
;;   R000: 1
;;   R01:  'DATA_STRING'
;;   R010: 'text'
;;   R02:  'DATA_ARRAY'
;;   R020: 2
;;   R03:  'DATA_ARRAY_ALT'
;;   R030: [ 1, 2 ]
;;   R04:  'DATA_STRUCT'
;;   R040: 'a'
;;   R041: 'b'
;;   R042: 'B'
;;   R043: 'c'
;;   R044: []
;;   R05:  'DATA_STRUCT_ALT'
;;   R050: { a: 1, b: 'B', c: [] }
```

#### struct for code graph nested list

> for now the data is stored in text, not binary, though not that readable

first unwind the nested list to a long 2D list, separated by `\n`,
add relative index to mark where the picked out list is.
this may help to generate a clearer diff.

format to store value:
- for keyword, map to ID
- for ID, as `typePrefix+radix36`
- for resource value, as JSON (good thing is the `\n` is escaped, and can be use as outer delimiter), or dataUri for binary

first, the unwind of nested list:
```
#0  (graph G00 +1)
#1  (exprList +1 +3 +5 +10 +12 +27)
#2  (defineConst D00 R00 +1)
#3  (resId R000) ------------------- cut
#4  (defineConst D01 R01 +1)
#5  (resId R010) ------------------- cut
#6  (defineConst D02 R02 +1)
#7  (array +1)
#8  (exprList +1 +2)
#9  (resId R000)
#10 (resId R020) ------------------- cut
#11 (defineConst D03 R03 +1)
#12 (resId R030) ------------------- cut
#13 (defineConst D04 R04 +1)
#14 (struct +1)
#15 (exprList +1 +5 +9)
#16 (structEntry +1)
#17 (exprList +1 +2)
#18 (resId R040)
#19 (resId R000) ------------------- cut
#20 (structEntry +1)
#21 (exprList +1 +2)
#22 (resId R041)
#23 (resId R042) ------------------- cut
#24 (structEntry +1)
#25 (exprList +1 +2)
#26 (resId R043)
#27 (resId R044) ------------------- cut
#28 (defineConst D05 R05 +1)
#29 (resId R050) ------------------- cut
```

then map the keyword:
```
# assume the keyword map to these ID
graph       -> K00
exprList    -> K01
defineConst -> K02
resId       -> K03
array       -> K04
struct      -> K05
structEntry -> K06

#0  K00 G00  +1
#1  K01 +1   +3  +5 +10 +12 +27
#2  K02 D00  R00 +1
#3  K03 R000
#4  K02 D01  R01 +1
#5  K03 R010
#6  K02 D02  R02 +1
#7  K04 +1
#8  K01 +1   +2
#9  K03 R000
#10 K03 R020
#11 K02 D03  R03 +1
#12 K03 R030
#13 K02 D04  R04 +1
#14 K05 +1
#15 K01 +1   +5  +9
#16 K06 +1
#17 K01 +1   +2
#18 K03 R040
#19 K03 R000
#20 K06 +1
#21 K01 +1   +2
#22 K03 R041
#23 K03 R042
#24 K06 +1
#25 K01 +1   +2
#26 K03 R043
#27 K03 R044
#28 K02 D05  R05 +1
#29 K03 R050
```

the file store the code graph nested list should look like
```
K00 G00  +1
K01 +1   +3  +5 +10 +12 +27
K02 D00  R00 +1
K03 R000
K02 D01  R01 +1
K03 R010
K02 D02  R02 +1
K04 +1
K01 +1   +2
K03 R000
K03 R020
K02 D03  R03 +1
K03 R030
K02 D04  R04 +1
K05 +1
K01 +1   +5  +9
K06 +1
K01 +1   +2
K03 R040
K03 R000
K06 +1
K01 +1   +2
K03 R041
K03 R042
K06 +1
K01 +1   +2
K03 R043
K03 R044
K02 D05  R05 +1
K03 R050
```


#### struct for resource map

format to store value:
- for ID, use base64
- for resource value, use JSON or JSON of dataUrl

the file store the resource map look like:
```
R00:  "DATA_NUMBER"
R000: 1
R01:  "DATA_STRING"
R010: "text"
R02:  "DATA_ARRAY"
R020: 2
R03:  "DATA_ARRAY_ALT"
R030: [1,2]
R04:  "DATA_STRUCT"
R040: "a"
R041: "b"
R042: "B"
R043: "c"
R044: []
R05:  "DATA_STRUCT_ALT"
R050: {"a":1,"b":"B","c":[]}
```
