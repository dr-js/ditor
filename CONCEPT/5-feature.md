## Feature

To build a graph-based coding environment, we need:
- the graph data structure and syntax
- a graph editor with some level of build/compile function
- graph/binary version-control system


--- --- ---

The graph data structure itself can be text,
  but graph in text is often not readable,
  so maybe store as compact binary and optionally support unpack as text.


--- --- ---

The graph editor should be server-client based,
  so both a web/GUI-based client and CLI client can be supported.

The reading experience should be similar to most text-based editor or IDE,
  but should support more syntax, linking, and more powerful search.

The editing experience should not strictly follow text-based style,
  there'll be a cursor, but editing is only committed as action units with valid code block result,
  most editing would be action units like:
- define-add: to define a new value with a name and unique ID,
    just write common statements should do, and the ID should be auto assigned.
- define-rename: to select value and change the name,
    pick the inline occurrence, or search by name/ID,
    then edit in value panel or maybe use Alt+R for the prompt
- reference-add: to reference defined value when writing statements,
    just type the name or short abbr, and select the inline prompt
- reference-move: just select the reference and type another name then select prompt
- reference-delete: select the reference and delete,
    most of the time the entire statement should be deleted,
    or the code block may be invalid

The editing experience may be similar to editing HTML and CSS in Browser Developer Tools,
  just the invalid code state will not be committed until the syntax is fixed.

The editor should support output text with syntax from graph data,
  based on provided rules.
And those rules would be common language syntax and ref to the standard lib symbols,
  this should allow the graph-based code to actually run on machines,
  since currently no language support this format, and all of them accept text.


--- --- ---

The version-control system should produce a reasonable diff from 2 versions of graph binary.
Currently `git` produce a good develop experience, but is optimized for text only,
  so it's either extend `git` to support graph data,
  or produce a new graph-base git-like tool for this job.
