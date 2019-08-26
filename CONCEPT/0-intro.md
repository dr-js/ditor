## Intro

What this should be, briefly:
- a graph data structure to store code
- an editor to edit the graph data, output text code,
  and provide some handy IDE support (format/rename/reference-check/transpile/minimize/...)

#### Text is the most popular code storage format
Almost all code is saved as **text** file, and the editor is also **text** based.
All extra code analysis starts from **text**, even for heavy all-in-one IDEs.

#### Text is bad for storing **references** (code link, dependency)
Despite its simplicity, text is a very limited data format.

Consider most of the code we write, we are actually doing two things:
**referencing** other function and values,
then use the **references** to compose blocks of expressions.

With text the **reference** is exist temporarily,
in an active IDE or during compiling.

Every time we save the code to text file, exit from the editor, the **references** will be gone.
Next time the editor launches, it will have to re-parse the **references** from the opened file.

#### text edits badly, when we do code refactor or other thing that's **reference** changing
Although it's not terrible viewing the code as highlighted text,
and most IDEs support hover for type definition,
editing the text is still indirect.

Consider some of the convenience features an IDE provides, like:
- use variable initials to speed up **reference** (`rAF` + `TAB` -> `requestAnimationFrame`)
- jump to definition
- show undefined or unused variables
- warn type mismatch
It's very basic for graph data structure, but difficult for text.

#### prefer **strong-reference** than **strong-typed**
Most of us consider **strongly-typed** languages to be safer,
because their basic tools do stricter checks.

However, non-strong-typed language, with advanced/varied tooling,
is also actively being used, with reasonable confidence of safety.

So the sense of safety may not come directly from the **strong-typed** syntax,
but the tooling instead.

What the tool checks is mostly **reference**,
and graph provides **strong-reference** by default,
which should be as safe, but a lot simpler to check.

#### **resource** (of all type) should be supported in graph, and allow code to **reference** them
In web development, many language/DSL and **resource**/data-file may be used and managed in a single project.
But for most language, with text based code, the **reference** to external code/**resource**
is kept through string-match or path-match, like JS to HTML/CSS code, or JS/CSS to image **resource** file
which is weak and tricky to maintain.

Graph allow **reference** beyond one language, and beyond just code.
It'll be much better, if both the code and the editor know
which image file is referenced by which block of code.

#### for an unfamiliar language, graph is more readable & understandable than actual code
For some languages, the text syntax can be confusing.
Which makes the verbose form - graph or AST - more approachable,
if the editor maps the two forms side by side,
is may be a good way to learn the syntax.

It should also help when reading dense spaghetti code,
or long expressions without sufficient parentheses to indicate operator precedence.

#### graph editor could replace some **tooling** for re-format, transpile, minify, repack
In JS tooling, there are commonly used **tooling** for:
- formatter (Prettier)
- transpiler (Babel)
- minimizer (Uglify/Terser)
- repack (Webpack/Rollup) 
Which all had to read text file, parse to AST,
do some magic on the AST, then output to text file. (drop the AST)

Graph can directly provide data equivalent to AST,
so **tooling** code can skip all the text step, do the magic simpler and faster.

And with the reduced complexity, a basic editor may support it directly.
It'll be good to have a relatively simple editor, with lower cpu & memory usage than an IDE,
but support heavier features like code formatting and outputting transpiled/minimized/packed code.

#### editing graph in editor should be more readable, and require less key stroke
Consider rendering the graph as text as a familiar editing experience.

Since the text rendering is done dynamically and locally,
each one can use their output style config to get what they read most comfortably.
and skip the whole fuss about how text code should be styled: it's un-styled graph, job done.

Then, when writing code, the auto completion can be more confident about what we want to type,
since the data in graph is pre-sorted and generally typed.

#### editor language support means define the text render syntax, the valid graph structure, and predefined system lib to reference from
For a graph base editor to support a language, some definitions/rules should be provided:
- A rule to render syntax is needed for correctly getting the text code output from the graph data.
- A definition of graph structure is needed to limit the graph the the code inside is actually within the language syntax.
- One or more predefined system lib to reference system function/value from,
  so the types and lib-functions can be globally available.

#### translate graph to multiple similar language (practical maybe?)
Another possibility is to support output/transpile to multiple similar languages from a shared graph,
which will enable some basic/common logic to be shared more easily, skipping tedious manual translation.
