## Some resonance
Ideas:
- synless (editor,no-online-demo,pre-alpha,terminal-ui,in-rust) a good concept description
  - https://github.com/justinpombrio/synless
  - https://github.com/justinpombrio/synless/blob/master/doc/why.md
  - http://justinpombrio.net/tree-editors/survey.html
- Isomorf (code-analyser,online-demo,for-multi-lang) a good preview of possible code analysis
  - https://isomorf.io/?#!/tours/~
- cirru (editor,online-demo,web-ui,for-closure) a not-so-good edit preview (strange cursor jumping)
  - http://cirru.org/
- lamdu (editor,no-online-demo,desktop-ui,in-closure) alternative edit preview
  - https://github.com/lamdu/lamdu
  - https://www.reddit.com/r/nosyntax/wiki/projects
- projecturEd (editor,no-online-demo,terminal-ui?,in-lisp)
  - https://github.com/projectured/projectured
- merman (editor,no-online-demo,desktop-ui,in-java) a good concept description
  - https://github.com/rendaw/merman
- Prune (abandoned) a good concept description
  - https://www.facebook.com/notes/kent-beck/prune-a-code-editor-that-is-not-a-text-editor/1012061842160013/
- Projectional Editing (concept) a good concept description
  - https://martinfowler.com/bliki/ProjectionalEditing.html
- MPS (editor,desktop-ui,for-multi-lang) not exactly, but possible preview of ui
  - https://www.jetbrains.com/mps/concepts/


## Extra background
- [Ideas about a new programming language for games. - Jonathan Blow](https://youtu.be/TH9VCN6UkyQ)
- [A Programming Language for Games, talk #2 - Jonathan Blow](https://youtu.be/5Nc68IdNKdg)
- [Gamelab2018 - Jon Blow's Design decisions on creating Jai a new language for game programmers](https://youtu.be/uZgbKrDEzAs)
- [Object-Oriented Programming is Bad - Brian Will](https://youtu.be/QM1iUe6IofM)
- [Replacing the Unix tradition - Brian Will](https://youtu.be/L9v4Mg8wi4U)


## compare

Traditional code editor:
  - pro:
    - easy to edit with
    - relatively small
  - con:
    - readability & understandability is directly related to
      how many/heavy the editor provided **plugin** is
    - **reference in code** is not directly saved in text,
      thus must be recreated every time the text is loaded (with some **plugin**)
    - **reference in code** is weak,
      so it's hard when changing/editing the code relation (like renaming/alter function arguments)
    - non-code **resource** file,
      or file contains 2nd/3rd language (like JS/HTML/CSS),
      is hard to reference and manage
  - mixed:
    - can save in structured folder & file,
      but may need too many file to actually split every unrelated function

Graph-based code editor:
  - pro:
    - readability & understandability is easy to achieve
    - less editor **plugin** is needed,
      also the plugin should be more general
    - **reference in code** is directly saved,
      and can be strong and cheaply validatable
    - **reference in code** modifying is a basic operation
    - **resource** can be saved and referenced in the graph
  - con:
    - **structured data** may need to be the save format,
      so specific editor is needed
    - **structured data** may not be good for SCM (like git) to support


Suppose for a Server/Client web repo using JS (Browser&Nodejs),
and with basic packaging/tooling (Babel/Webpack/UglifyJS)

with Traditional code editor:
```
Editor:
  text:    .js/.jsx/.css/.pcss/.scss/.html/.svg
  binary:  .png/.jpeg/.woff/.ttf

Source:
  text:    .js/.jsx/.css/.pcss/.scss/.html/.svg
  binary:  .png/.jpeg/.woff/.ttf

Code process:
  Babel:    .js <- .js (transpile)
  Webpack:  text/binay <- text/binay (optimize reference)
  UglifyJS: .js <- .js (minimize code size)

Output:
  text:    .js/.css/.html/.svg
  binary:  .png/.jpeg/.woff/.ttf
```

Graph-based code editor:
```
Editor:
  graph
    code&reference
    resource
  text&binary

Source:
  graph:
    code&reference:   .js/.jsx/.css/.pcss/.scss/.html
    resource:
      text:    .svg
      binary:  .png/.jpeg/.woff/.ttf

Code process:
  Editor:
    graph <- graph (optimize/transpile/minimize)
    text/binay <- graph (unpack to output format)

Output:
  text:    .js/.css/.html/.svg
  binary:  .png/.jpeg/.woff/.ttf
```
