'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Base64url for both node.js and brwser javascript. It can work with ArrayBuffer|TypedArray|Buffer
 *
 * @remarks Bowser code obtained from https://github.com/panva/jose/blob/main/src/runtime/browser/base64url.ts
 * @packageDocumentation
 */
/**
 * Base64Url encoding of a buffer input or a string (UTF16 in browsers, UTF8 in node)
 * @param input
 * @param urlsafe - if true Base64 URL encoding is used ('+' and '/' are replaced by '-', '_')
 * @param padding - if false, padding (trailing '=') is removed
 * @returns a string with the base64-encoded representation of the input
 */
function encode(input, urlsafe = false, padding = true) {
    let base64 = '';
    {
        const bytes = (typeof input === 'string')
            ? Buffer.from(input, 'utf8')
            : Buffer.from(input);
        base64 = bytes.toString('base64');
    }
    if (urlsafe)
        base64 = base64ToBase64url(base64);
    if (!padding)
        base64 = removeBase64Padding(base64);
    return base64;
}
/**
 * Base64url decoding (binary output) of base64url-encoded string
 * @param base64 - a base64 string
 * @param stringOutput - if true a UTF16 (browser) or UTF8 (node) string is returned
 * @returns a buffer or unicode string
 */
function decode(base64, stringOutput = false) {
    {
        const buffer = Buffer.from(base64, 'base64');
        return stringOutput
            ? buffer.toString('utf8')
            : new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
    }
}
function base64ToBase64url(base64) {
    return base64.replace(/\+/g, '-').replace(/\//g, '_');
}
function removeBase64Padding(str) {
    return str.replace(/=/g, '');
}

exports.decode = decode;
exports.encode = encode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubm9kZS5janMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6bnVsbCwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7QUFjQTs7Ozs7OztTQU9nQixNQUFNLENBQUUsS0FBMkMsRUFBRSxVQUFtQixLQUFLLEVBQUUsVUFBbUIsSUFBSTtJQUNwSCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFNUjtRQUNMLE1BQU0sS0FBSyxHQUFHLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUTtjQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7Y0FDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QixNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUNsQztJQUNELElBQUksT0FBTztRQUFFLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvQyxJQUFJLENBQUMsT0FBTztRQUFFLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNsRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUM7QUFFRDs7Ozs7O1NBTWdCLE1BQU0sQ0FBRSxNQUFjLEVBQUUsZUFBd0IsS0FBSztJQWE1RDtRQUNMLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzVDLE9BQU8sWUFBWTtjQUNmLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2NBQ3ZCLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDcEU7QUFDSCxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBRSxNQUFjO0lBQ3hDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUN2RCxDQUFDO0FBTUQsU0FBUyxtQkFBbUIsQ0FBRSxHQUFXO0lBQ3ZDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDOUI7Ozs7OyJ9
