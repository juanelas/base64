# @juanelas/base64 - v1.0.5

Base64url for both node.js and brwser javascript. It can work with ArrayBuffer|TypedArray|Buffer

**`Remarks`**

Bowser code obtained from https://github.com/panva/jose/blob/main/src/runtime/browser/base64url.ts

## Table of contents

### Type Aliases

- [TypedArray](API.md#typedarray)

### Functions

- [decode](API.md#decode)
- [encode](API.md#encode)

## Type Aliases

### TypedArray

Ƭ **TypedArray**: `Int8Array` \| `Uint8Array` \| `Uint8ClampedArray` \| `Int16Array` \| `Uint16Array` \| `Int32Array` \| `Uint32Array` \| `Float32Array` \| `Float64Array` \| `BigInt64Array` \| `BigUint64Array`

A TypedArray object describes an array-like view of an underlying binary data buffer.

#### Defined in

[index.ts:13](https://github.com/juanelas/base64/blob/cfc2a30/src/ts/index.ts#L13)

## Functions

### decode

▸ **decode**(`base64`, `stringOutput?`): `Uint8Array` \| `string`

Base64url decoding (binary output) of base64url-encoded string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `base64` | `string` | `undefined` | a base64 string |
| `stringOutput` | `boolean` | `false` | if true a UTF16 (browser) or UTF8 (node) string is returned |

#### Returns

`Uint8Array` \| `string`

a buffer or unicode string

#### Defined in

[index.ts:46](https://github.com/juanelas/base64/blob/cfc2a30/src/ts/index.ts#L46)

___

### encode

▸ **encode**(`input`, `urlsafe?`, `padding?`): `string`

Base64Url encoding of a buffer input or a string (UTF16 in browsers, UTF8 in node)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `string` \| [`TypedArray`](API.md#typedarray) \| `ArrayBuffer` \| `Buffer` | `undefined` |  |
| `urlsafe` | `boolean` | `false` | if true Base64 URL encoding is used ('+' and '/' are replaced by '-', '_') |
| `padding` | `boolean` | `true` | if false, padding (trailing '=') is removed |

#### Returns

`string`

a string with the base64-encoded representation of the input

#### Defined in

[index.ts:22](https://github.com/juanelas/base64/blob/cfc2a30/src/ts/index.ts#L22)
