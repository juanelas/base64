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

export { decode, encode };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubm9kZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUFLRztBQVNIOzs7Ozs7QUFNRztBQUNHLFNBQVUsTUFBTSxDQUFFLEtBQTJDLEVBQUUsT0FBbUIsR0FBQSxLQUFLLEVBQUUsT0FBQSxHQUFtQixJQUFJLEVBQUE7SUFDcEgsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0FBQ2YsSUFLTztBQUNMLFFBQUEsTUFBTSxLQUFLLEdBQUcsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRO2NBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztBQUM1QixjQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDdEIsUUFBQSxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNsQyxLQUFBO0FBQ0QsSUFBQSxJQUFJLE9BQU87QUFBRSxRQUFBLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMvQyxJQUFBLElBQUksQ0FBQyxPQUFPO0FBQUUsUUFBQSxNQUFNLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDbEQsSUFBQSxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUM7QUFFRDs7Ozs7QUFLRztTQUNhLE1BQU0sQ0FBRSxNQUFjLEVBQUUsZUFBd0IsS0FBSyxFQUFBO0FBQ25FLElBWU87UUFDTCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUM1QyxRQUFBLE9BQU8sWUFBWTtBQUNqQixjQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0FBQ3pCLGNBQUUsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNwRSxLQUFBO0FBQ0gsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUUsTUFBYyxFQUFBO0FBQ3hDLElBQUEsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ3ZELENBQUM7QUFNRCxTQUFTLG1CQUFtQixDQUFFLEdBQVcsRUFBQTtJQUN2QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQzlCOzs7OyJ9
