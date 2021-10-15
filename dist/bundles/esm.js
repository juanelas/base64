/**
 * Array of bytes to Base64 string decoding
 * @param sBase64 - a base64-encoded string
 * @returns
 */
function base64DecToArr(sB64Enc) {
    const nInLen = sB64Enc.length;
    const nOutLen = nInLen * 3 + 1 >> 2;
    const taBytes = new Uint8Array(nOutLen);
    for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
        nMod4 = nInIdx & 3;
        nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 6 * (3 - nMod4);
        if (nMod4 === 3 || nInLen - nInIdx === 1) {
            for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
            }
            nUint24 = 0;
        }
    }
    return taBytes;
}
/**
 * Base64 string to array encoding
 * @param aBytes - a buffer
 * @returns a base64-encoded string
 */
function base64EncArr(aBytes) {
    let nMod3 = 2;
    let sB64Enc = '';
    for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
        nMod3 = nIdx % 3;
        if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0) {
            sB64Enc += '\r\n';
        }
        nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
        if (nMod3 === 2 || aBytes.length - nIdx === 1) {
            sB64Enc += String.fromCharCode(uint6ToB64(nUint24 >>> 18 & 63), uint6ToB64(nUint24 >>> 12 & 63), uint6ToB64(nUint24 >>> 6 & 63), uint6ToB64(nUint24 & 63));
            nUint24 = 0;
        }
    }
    return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) + (nMod3 === 2 ? '' : nMod3 === 1 ? '=' : '==');
}
function b64ToUint6(nChr) {
    return nChr > 64 && nChr < 91
        ? nChr - 65
        : nChr > 96 && nChr < 123
            ? nChr - 71
            : nChr > 47 && nChr < 58
                ? nChr + 4
                : nChr === 43
                    ? 62
                    : nChr === 47
                        ? 63
                        : 0;
}
function uint6ToB64(nUint6) {
    return nUint6 < 26
        ? nUint6 + 65
        : nUint6 < 52
            ? nUint6 + 71
            : nUint6 < 62
                ? nUint6 - 4
                : nUint6 === 62
                    ? 43
                    : nUint6 === 63
                        ? 47
                        : 65;
}

/**
 * Base64url for both node.js and brwser javascript. It can work with ArrayBuffer|TypedArray|Buffer
 *
 * @remarks Bowser code by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
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
            ? (new TextEncoder()).encode(input)
            : new Uint8Array(input);
        base64 = base64EncArr(bytes);
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
        let urlsafe = false;
        if (/^[0-9a-zA-Z_-]+={0,2}$/.test(base64)) {
            urlsafe = true;
        }
        else if (!/^[0-9a-zA-Z+/]*={0,2}$/.test(base64)) {
            throw new Error('Not a valid base64 input');
        }
        if (urlsafe)
            base64 = base64urlToBase64(base64);
        const bytes = base64DecToArr(base64);
        return stringOutput
            ? (new TextDecoder()).decode(bytes)
            : bytes;
    }
}
function base64ToBase64url(base64) {
    return base64.replace(/\+/g, '-').replace(/\//g, '_');
}
function base64urlToBase64(base64url) {
    return base64url.replace(/-/g, '+').replace(/_/g, '/').replace(/=/g, '');
}
function removeBase64Padding(str) {
    return str.replace(/=/g, '');
}

export { decode, encode };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNtLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHMvbWRuLWJhc2U2NC50cyIsIi4uLy4uL3NyYy90cy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6bnVsbCwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O1NBS2dCLGNBQWMsQ0FBRSxPQUFlO0lBQzdDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUE7SUFDN0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ25DLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXZDLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDdEYsS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUE7UUFDbEIsT0FBTyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQTtRQUNwRSxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDeEMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDbEUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sTUFBTSxFQUFFLEtBQUssS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQTthQUN6RDtZQUNELE9BQU8sR0FBRyxDQUFDLENBQUE7U0FDWjtLQUNGO0lBRUQsT0FBTyxPQUFPLENBQUE7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
