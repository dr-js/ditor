## TODO: data store format
Consider which store format is better, text or binary:
- the resulting text is not that readable, a little bigger, and parsing a little slower,
  but has clear delimiter, easier to inspect if really needed
- should compatible for git to support, or plugin to support git,
  or we may need to build a git for graph

## TODO: keyword/syntax range
No OO syntax support, consider discourage it?
Or consider just ban `class`, `this`, `self`, or `@`
