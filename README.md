[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


# @juanelas/base64url

Your package description

## Usage

`@juanelas/base64url` can be imported to your project with `npm`:

```console
npm install @juanelas/base64url
```

Then either require (Node.js CJS):

```javascript
const base64url = require('@juanelas/base64url')
```

or import (JavaScript ES module):

```javascript
import * as base64url from '@juanelas/base64url'
```

The appropriate version for browser or node is automatically exported. Types for TypeScript users are also provided.

You can also download the IIFE bundle, the ESM bundle or the UMD bundle and manually add it to your project, or, if you have already installed `@juanelas/base64url` in your project, just get the bundles from `node_modules/@juanelas/base64url/dist/bundles/`.

An example of usage could be:

```typescript
import * as base64url from '@juanelas/base64url'

const buf = new Uint8Array([254, 1, 128, 255])
const base64str = base64url.encode(buf, true, false) // URL-safe base64 with no padding

console.log(base64str) // Outputs: '_gGA_w'

const buf2 = base64url.decode(base64str) // URL-safe encdoing and padding are automatically detected

console.log(buf2.toString()) // Outputs: '254,1,128,255'

const text = 'fooba'
const base64str = base64url.encode(text) // Standard base64 with padding

console.log(base64str) // Outputs: 'Zm9vYmE='

const text2 = base64url.decode(base64str, true) // Output to unicode string instead of Uint8Array

console.log(text2) // Outputs: 'fooba'

```

## API reference documentation

[Check the API](./docs/API.md)
