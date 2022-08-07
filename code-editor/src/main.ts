import { transform } from '@babel/standalone'

import monacoEditor from './lib/monaco/monacoEditor'
import { elements, showError, showIframe } from './utils/dom'
import { importsRegex, pureRegex, replace } from './utils/format'
import { debounce } from './utils/helpers'

import type { ErrorMessageType, StateType, TranspiledCodeType } from './types'

let state: StateType = 'editing'
let errorMessage: ErrorMessageType = ''

function transpileCode(code: string): TranspiledCodeType {
  // ignore imports so Babel doesn't transpile it
  const codeToTranspile =  code //  replace(code, importsRegex)
  // the magic sauce used to transpile the code
  const options = { presets: ['es2015-loose', "typescript"],  filename: "dummy.ts", sourceMaps: "inline" }
  const { code: transpiledCode, ...others } = transform(codeToTranspile, options)
  console.log(others)

  if (!transpiledCode) {
    // syntax errors get caught by the `error` listener
    throw new Error(`Something went wrong transpiling ${codeToTranspile}.`)
  }

  const hasImports = Boolean(code.match(importsRegex))
  const imports = code.match(importsRegex)?.join('\n') ?? ''

  return {
    // this is passed to `updateIframe`
    iframeCode: transpiledCode, // hasImports ? `${imports}\n${transpiledCode}` : transpiledCode,
    // this is passed to `updateSource`
    // ignore /*#__PURE__*/ from transpiled output to reduce noise
    sourceCode: transpiledCode, // replace(transpiledCode, pureRegex),
  }
}

function updateIframe(code: string): void {
  const importedCode = `
    "use strict";
    exports.__esModule = true;
    exports.myVar = void 0;
    var myVar = "myVar Value";
    exports.myVar = myVar;
  `;

  const source = /* html */ `
      <html>
      <head>
        <link rel="stylesheet" href="/iframe.css">
      </head>
      <body>
        <script type="module">
            const importFunc = (exports) => {
                ${importedCode}
            }

            window.require = (path) => {
                let a = {}
                console.log('a', a)
                importFunc(a)
                console.log('a', a)
                return a
            }
        </script>
        <script type="module">${code}</script>
      </body>
      </html>
    `
  elements.iframe.srcdoc = source
}

function updateSource(transpiledOutput: string): void {
  const sourceHTML = /* html */ `
      <h3>📜 Source</h3>
      <xmp>${transpiledOutput}</xmp>
    `
  elements.source.innerHTML = sourceHTML
}

function logError(error: string): void {
  const errorHtml = /* html */ `
      <h3>💩 Error</h3>
      <xmp>${error}</xmp>
    `
  elements.errors.innerHTML = errorHtml
}

function updateUI(): void {
  if (state === 'editing') {
    showIframe()
    const code = monacoEditor.getValue()
    const { iframeCode, sourceCode } = transpileCode(code)
    updateIframe(iframeCode)
    updateSource(sourceCode)
    return
  }

  if (state === 'error') {
    showError()
    logError(errorMessage)
    return
  }

  throw new Error(`State ${state} should not be possible. 💥`)
}

elements.editor.addEventListener('keyup', debounce(updateUI))

window.addEventListener('error', ({ error }: ErrorEvent) => {
  state = 'error'
  errorMessage = error.message
  updateUI()

  // if there is no longer an `error` on the page
  state = 'editing'
})

window.addEventListener('load', () => elements.loading.remove())

updateUI()
