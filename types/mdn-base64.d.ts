/**
 * Base64 / binary data / UTF-8 strings utilities
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
*
 */
/**
 * Array of bytes to Base64 string decoding
 * @param sBase64 - a base64-encoded string
 * @returns
 */
export declare function base64DecToArr(sB64Enc: string): Uint8Array;
/**
 * Base64 string to array encoding
 * @param aBytes - a buffer
 * @returns a base64-encoded string
 */
export declare function base64EncArr(aBytes: Uint8Array): string;
//# sourceMappingURL=mdn-base64.d.ts.map