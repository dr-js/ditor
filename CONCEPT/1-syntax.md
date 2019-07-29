## syntax

So how data should be structured in **graph data**?

Sort of like AST (or ASG: abstract syntax graph).

Basic syntax for graph is nested lists: (so a lisp-like syntax is used here)
```lisp
(syntax TYPE string) ;; name of syntax like: "defineConst|array|struct|..."

(syntax DEF_ID u64) ;; unique id for the result of the define expr
(syntax REF_ID u64) ;; reference to id

(syntax RES_ID u64) ;; reference to resource id
(syntax NAME_RES_ID u64) ;; reference to resource id, specifically for name of defined result

(syntax EXPR (oneOf
  (TYPE DEF_ID NAME_RES_ID EXPR_LIST) ;; mostly for variable define
  (TYPE DEF_ID NAME_RES_ID)
  (TYPE DEF_ID EXPR_LIST)
  (TYPE REF_ID) ;; mostly for variable/resource reference
  (TYPE RES_ID)
  (TYPE EXPR_LIST)
))
(syntax EXPR_LIST (oneOf
  (exprList EXPR EXPR EXPR EXPR ...) ;; should have at least 2 EXPR, or just use below EXPR
  EXPR ;; also accept single EXPR
))
```

And for resource, a map is used:
```yaml
R00:  'VALUE_STRING'
R01:  1
R02:  [ 1, 'VALUE_STRING' ]
R03:  { a: 1, b: 'B', c: [] }
R04:  data:application/octet-stream;base64,0123456789ABCD== # https://en.wikipedia.org/wiki/Data_URI_scheme
R05:  data:image/png;base64,0123456789ABCD==
``` 

#### syntax - define
Suppose the sample JS code:
```js
const DATA_NUMBER = 1
const DATA_STRING = 'text'
const DATA_ARRAY = [ 1, 2 ]
const DATA_ARRAY_ALT = [ 1, 2 ]
const DATA_STRUCT = { a: 1, b: 'B', c: [] }
const DATA_STRUCT_ALT = { a: 1, b: 'B', c: [] }
```

First extract the **resource** to **reference**:
```js
const R00 = R000
const R01 = R010
const R02 = [ R000, R020 ]
const R03 = R030
const R04 = { R040: R000, R041: R042, R043: R044 }
const R05 = R050

// resMap
//   R00:  'DATA_NUMBER'
//   R000: 1
//   R01:  'DATA_STRING'
//   R010: 'text'
//   R02:  'DATA_ARRAY'
//   R020: 2
//   R03:  'DATA_ARRAY_ALT'
//   R030: [ 1, 2 ]
//   R04:  'DATA_STRUCT'
//   R040: 'a'
//   R041: 'b'
//   R042: 'B'
//   R043: 'c'
//   R044: []
//   R05:  'DATA_STRUCT_ALT'
//   R050: { a: 1, b: 'B', c: [] }
```

Then represent the code in graph:
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
    (structItem (exprList (resId R040) (resId R000)))
    (structItem (exprList (resId R041) (resId R042)))
    (structItem (exprList (resId R043) (resId R044)))
  )))
  (defineConst D05 R05 (resId R050))
))
```

#### syntax - assign
Suppose the sample JS code:
```js
let a
a = 1
a += 1
```

First extract the **resource** to **reference**:
```js
let R00
R00 = R01
R00 += R01

// resMap
//   R00: 'a'
//   R01: 1
```

Then represent the code in graph:
```lisp
(graph G00 (exprList
  (graphDependency LANG_G00)
  (defineLet D00 R00)
  (assign (exprList (refId D00) (resId R01)))
  (assign (exprList
    (refId D00)
    (invoke (exprList (refId LANG_G00_D00) (refId D00) (resId R01)))
  ))
))
```

With predefined language graph like:
```lisp
(graph LANG_G00 (exprList
  (defineConst D00 R00 (
    ;; more define... 
  ))
  ;; more define...
))
;; resMap
;;   R00: '+'
```

#### syntax - scope {}
Suppose the sample JS code:
```js
const a = 1
{
  const a = 2
  console.log(a)
}
console.log(a)
```

First extract the **resource** to **reference**:
```js
const R00 = R01
{
  const R00 = R02
  console.log(R00)
}
console.log(R00)

// resMap
//   R00: 'a'
//   R01: 1
//   R02: 2
```

Then represent the code in graph:
```lisp
(graph G00 (exprList
  (graphDependency LANG_G00)
  (defineConst D00 R00 (resId R01))
  (scope (exprList
    (defineConst D01 R00 (resId R01))
    (invoke (exprList (refId LANG_G00_D00) (refId D01)))
  ))
  (invoke (exprList (refId LANG_G00_D00) (refId D00)))
))

(graph LANG_G00 (exprList
  ;; define "console.log" as LANG_G00_D00
))
```

#### syntax - function
Suppose the sample JS code:
```js
const add = (a, b) => {
  console.log(a)
  return a + b
}
```

First extract the **resource** to **reference**:
```js
const R00 = (R01, R02) => {
  return R01 + R02
}

// resMap
//   R00: 'add'
//   R01: 'a'
//   R02: 'b'
```

Then represent the code in graph:
```lisp
(graph G00 (exprList
  (graphDependency LANG_G00)
  (defineConst D00 R00 (exprList
    (function (exprList
      (scopeCapture (exprList
        (defineLet D01 R01 (functionArgument 0)) ;; pull out function argument to scope
        (defineLet D02 R02 (functionArgument 1))
      ))
      ;; here the scope strcutre is reused in function
      (scope (exprList
        (invoke (exprList (refId LANG_G00_D00) (refId D01) (refId D02)))
      ))
    ))
  ))
))

(graph LANG_G00 (exprList
  ;; define "+" as LANG_G00_D00
))
```


## TODO: more sample with lisp-like syntax:
#### syntax - control loop (if for)
#### syntax - switch case
#### syntax - import
#### syntax - export
#### syntax - foreign resource
#### syntax - predefined language graph
#### tooling - rename variable
#### tooling - detect broken reference 
