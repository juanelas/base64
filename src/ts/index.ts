/**
 * Base64url for both node.js and brwser javascript. It can work with ArrayBuffer|TypedArray|Buffer
 *
 * @remarks Bowser code obtained from https://github.com/panva/jose/blob/main/src/runtime/browser/base64url.ts
 * @packageDocumentation
 */

import { base64Encode, base64Decode } from './browser-base64'

/**
 * A TypedArray object describes an array-like view of an underlying binary data buffer.
 */
export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array

/**
 * Base64Url encoding of a buffer input or a string (UTF16 in browsers, UTF8 in node)
 * @param input
 * @param urlsafe - if true Base64 URL encoding is used ('+' and '/' are replaced by '-', '_')
 * @param padding - if false, padding (trailing '=') is removed
 * @returns a string with the base64-encoded representation of the input
 */
export function encode (input: ArrayBuffer|TypedArray|Buffer|string, urlsafe: boolean = false, padding: boolean = true): string {
  let base64 = ''
  if (IS_BROWSER) {
    const bytes = (typeof input === 'string')
      ? (new TextEncoder()).encode(input)
      : new Uint8Array(input)
    base64 = base64Encode(bytes)
  } else {
    const bytes = (typeof input === 'string')
      ? Buffer.from(input, 'utf8')
      : Buffer.from(input)
    base64 = bytes.toString('base64')
  }
  if (urlsafe) base64 = base64ToBase64url(base64)
  if (!padding) base64 = removeBase64Padding(base64)
  return base64
}

/**
 * Base64url decoding (binary output) of base64url-encoded string
 * @param base64 - a base64 string
 * @param stringOutput - if true a UTF16 (browser) or UTF8 (node) string is returned
 * @returns a buffer or unicode string
 */
export function decode (base64: string, stringOutput: boolean = false): Uint8Array|string {
  if (IS_BROWSER) {
    let urlsafe = false
    if (/^[0-9a-zA-Z_-]+={0,2}$/.test(base64)) {
      urlsafe = true
    } else if (!/^[0-9a-zA-Z+/]*={0,2}$/.test(base64)) {
      throw new Error('Not a valid base64 input')
    }
    if (urlsafe) base64 = base64urlToBase64(base64)
    const bytes = base64Decode(base64)
    return stringOutput
      ? (new TextDecoder()).decode(bytes)
      : bytes
  } else {
    const buffer = Buffer.from(base64, 'base64')
    return stringOutput
      ? buffer.toString('utf8')
      : new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length)
  }
}

function base64ToBase64url (base64: string): string {
  return base64.replace(/\+/g, '-').replace(/\//g, '_')
}

function base64urlToBase64 (base64url: string): string {
  return base64url.replace(/-/g, '+').replace(/_/g, '/').replace(/=/g, '')
}

function removeBase64Padding (str: string): string {
  return str.replace(/=/g, '')
}
