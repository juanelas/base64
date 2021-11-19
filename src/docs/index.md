[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
{{GITHUB_ACTIONS_BADGES}}

# {{PKG_NAME}}

Base64 for both node.js and browser javascript. It supports URL-safe encoding and enabling/disabling padding. Buffers can be implementedd using ArrayBuffer, any TypedArray, or Buffer.

## Usage

`{{PKG_NAME}}` can be imported to your project with `npm`:

```console
npm install {{PKG_NAME}}
```

Then either require (Node.js CJS):

```javascript
const {{PKG_CAMELCASE}} = require('{{PKG_NAME}}')
```

or import (JavaScript ES module):

```javascript
import * as {{PKG_CAMELCASE}} from '{{PKG_NAME}}'
```

The appropriate version for browser or node is automatically exported. Types for TypeScript users are also provided.

You can also download the {{IIFE_BUNDLE}}, the {{ESM_BUNDLE}} or the {{UMD_BUNDLE}} and manually add it to your project, or, if you have already installed `{{PKG_NAME}}` in your project, just get the bundles from `node_modules/{{PKG_NAME}}/dist/bundles/`.

An example of usage could be:

```typescript
import * as {{PKG_CAMELCASE}} from '{{PKG_NAME}}'

const buf = new Uint8Array([254, 1, 128, 255])
const base64str = {{PKG_CAMELCASE}}.encode(buf, true, false) // URL-safe base64 with no padding

console.log(base64str) // Outputs: '_gGA_w'

const buf2 = {{PKG_CAMELCASE}}.decode(base64str) // URL-safe encoding and padding are automatically detected

console.log(buf2.toString()) // Outputs: '254,1,128,255'

const text = 'fooba'
const base64str2 = {{PKG_CAMELCASE}}.encode(text) // Standard base64 with padding

console.log(base64str2) // Outputs: 'Zm9vYmE='

const text2 = {{PKG_CAMELCASE}}.decode(base64str2, true) // Output to unicode string instead of Uint8Array

console.log(text2) // Outputs: 'fooba'

```

## API reference documentation

[Check the API](./docs/API.md)
