// /* Import only those modules that you need so reduce bundle size */
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
// import 'monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/ghostTextController'
// import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution'
// import 'monaco-editor/esm/vs/language/typescript/monaco.contribution'

/* Importing all monaco editor features during development */
import * as monaco from 'monaco-editor';


import { elements } from '../../utils/dom'

const editorCode = /* html */ `

console.log("Hello World from monaco editor");
const button = document.createElement("button")
button.addEventListener("click", () => {
  alert("Button clicked")
})
button.innerHTML = "Click me"

// 2. Append somewhere
const body = document.getElementsByTagName("body")[0];
body.appendChild(button);

type MyType = {
  a: number
}

const a: MyType = {
  a: 1
}


console.log(a)

`.trim()

const editorOptions = {
  value: editorCode,
  language: 'typescript',
  theme: 'vs-dark',
  automaticLayout: true,
  minimap: {
    enabled: false,
  },
  fontFamily: 'IBM Plex Mono, monospace',
  fontSize: 16,
  tabSize: 2,
}

const monacoEditor = monaco.editor.create(elements.editor, editorOptions)
export { monacoEditor as default, monaco }
