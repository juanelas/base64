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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnJvd3Nlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3RzL21kbi1iYXNlNjQudHMiLCIuLi8uLi9zcmMvdHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztTQUtnQixjQUFjLENBQUUsT0FBZTtJQUM3QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFBO0lBQzdCLE1BQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNuQyxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUV2QyxLQUFLLElBQUksS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3RGLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUE7UUFDcEUsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3hDLEtBQUssS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUU7Z0JBQ2xFLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLE1BQU0sRUFBRSxLQUFLLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUE7YUFDekQ7WUFDRCxPQUFPLEdBQUcsQ0FBQyxDQUFBO1NBQ1o7S0FDRjtJQUVELE9BQU8s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
