import { transform } from '@babel/standalone'

import monacoEditor from './lib/monaco/monacoEditor'
import { elements, showError, showIframe } from './utils/dom'
import { importsRegex, pureRegex, replace } from './utils/format'
import { debounce } from './utils/helpers'

import type { ErrorMessageType, StateType } from './types'

let state: StateType = 'editing'
let errorMessage: ErrorMessageType = ''

const files = [
  {
    filename: "test.ts",
    extension: "ts",
    filepath: "test",
    content: /* html */ `
    export const myVar = 30;
    export const doStuff = () => {
      console.log('doStuff')
    }
    `.trim()
  }
]

const transpileTSCode = (filename: string, code: string, sourceMaps: any): string => {
  // the magic sauce used to transpile the code
  const options = { presets: ['es2015-loose', "typescript"],  filename: filename, sourceMaps: sourceMaps }
  const { code: transpiledCode } = transform(code, options)

  if (!transpiledCode) {
    // syntax errors get caught by the `error` listener
    throw new Error(`Something went wrong transpiling ${code}.`)
  }

  return transpiledCode
}

function updateIframe(entryFileCode: string): void {
  const allFiles = [
    {filename: "main.ts", extension: "ts", filepath: "main.ts", content: entryFileCode},
    ...files
  ]
  const entryFileIndex = 0;

  let transpiledFiles = allFiles.map(({ filename, filepath, content }) => `
      {
        filename: "${ filename }",
        filepath: "${ filepath }",
        func: function (require, exports) {
          ${ transpileTSCode(filename, content, false) }
        },
        exports: {}
      }
    `);

  let code = `
    const modules = [${ transpiledFiles.join(',') }];
    window.require = function(file) {
        const module = modules.find(({ filename, filepath }) => {
        return filepath == file
      });

      if (!module) {
        throw new Error('Can not find "' + file + '" file.');
      }
      module.func(require, module.exports);
      return module.exports;
    };
    modules[${ entryFileIndex }].func(require, modules[${ entryFileIndex }].exports);
  `
  code = transpileTSCode("dummy.ts", code, "inline")

  const source = /* html */ `
      <html>
      <head>
        <link rel="stylesheet" href="/iframe.css">
      </head>
      <body>
        <script type="module">${code}</script>
      </body>
      </html>
    `
  elements.iframe.srcdoc = source
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
    updateIframe(code)
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
