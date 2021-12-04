const base64Encode = (bytes) => {
    const CHUNK_SIZE = 0x8000;
    const arr = [];
    for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
        // @ts-expect-error
        arr.push(String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK_SIZE)));
    }
    return btoa(arr.join(''));
};
const base64Decode = (encoded) => {
    return new Uint8Array(atob(encoded)
        .split('')
        .map((c) => c.charCodeAt(0)));
};

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
            ? (new TextEncoder()).encode(input)
            : new Uint8Array(input);
        base64 = base64Encode(bytes);
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
        const bytes = base64Decode(base64);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnJvd3Nlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3RzL2Jyb3dzZXItYmFzZTY0LnRzIiwiLi4vLi4vc3JjL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBTyxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQWlCO0lBQzVDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQTtJQUN6QixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksVUFBVSxFQUFFOztRQUVqRCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQzdFO0lBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQzNCLENBQUMsQ0FBQTtBQUVNLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBZTtJQUMxQyxPQUFPLElBQUksVUFBVSxDQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ1YsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNULEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQy9CLENBQUE7QUFDSCxDQUFDOztBQ2hCRDs7Ozs7O0FBY0E7Ozs7Ozs7U0FPZ0IsTUFBTSxDQUFFLEtBQTJDLEVBQUUsVUFBbUIsS0FBSyxFQUFFLFVBQW1CLElBQUk7SUFDcEgsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ0M7UUFDZCxNQUFNLEtBQUssR0FBRyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVE7Y0FDcEMsQ0FBQyxJQUFJLFdBQVcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUM7Y0FDakMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDekIsTUFBTSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQU03QjtJQUNELElBQUksT0FBTztRQUFFLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvQyxJQUFJLENBQUMsT0FBTztRQUFFLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNsRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUM7QUFFRDs7Ozs7O1NBTWdCLE1BQU0sQ0FBRSxNQUFjLEVBQUUsZUFBd0IsS0FBSztJQUNuRDtRQUNkLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQTtRQUNuQixJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN6QyxPQUFPLEdBQUcsSUFBSSxDQUFBO1NBQ2Y7YUFBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtTQUM1QztRQUNELElBQUksT0FBTztZQUFFLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMvQyxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbEMsT0FBTyxZQUFZO2NBQ2YsQ0FBQyxJQUFJLFdBQVcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUM7Y0FDakMsS0FBSyxDQUFBO0tBTVY7QUFDSCxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBRSxNQUFjO0lBQ3hDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUN2RCxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBRSxTQUFpQjtJQUMzQyxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUMxRSxDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FBRSxHQUFXO0lBQ3ZDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDOUI7Ozs7In0=
