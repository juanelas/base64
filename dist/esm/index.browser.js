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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnJvd3Nlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3RzL2Jyb3dzZXItYmFzZTY0LnRzIiwiLi4vLi4vc3JjL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBTyxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQWlCLEtBQVk7SUFDeEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFBO0lBQ3pCLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQTtBQUNkLElBQUEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLFVBQVUsRUFBRTs7UUFFakQsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM3RSxLQUFBO0lBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQzNCLENBQUMsQ0FBQTtBQUVNLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBZSxLQUFnQjtBQUMxRCxJQUFBLE9BQU8sSUFBSSxVQUFVLENBQ25CLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDVixLQUFLLENBQUMsRUFBRSxDQUFDO0FBQ1QsU0FBQSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMvQixDQUFBO0FBQ0gsQ0FBQzs7QUNoQkQ7Ozs7O0FBS0c7QUFTSDs7Ozs7O0FBTUc7QUFDRyxTQUFVLE1BQU0sQ0FBRSxLQUEyQyxFQUFFLE9BQW1CLEdBQUEsS0FBSyxFQUFFLE9BQUEsR0FBbUIsSUFBSSxFQUFBO0lBQ3BILElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtBQUNmLElBQWdCO0FBQ2QsUUFBQSxNQUFNLEtBQUssR0FBRyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVE7Y0FDcEMsQ0FBQyxJQUFJLFdBQVcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDbkMsY0FBRSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN6QixRQUFBLE1BQU0sR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDN0IsS0FLQTtBQUNELElBQUEsSUFBSSxPQUFPO0FBQUUsUUFBQSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDL0MsSUFBQSxJQUFJLENBQUMsT0FBTztBQUFFLFFBQUEsTUFBTSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ2xELElBQUEsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDO0FBRUQ7Ozs7O0FBS0c7U0FDYSxNQUFNLENBQUUsTUFBYyxFQUFFLGVBQXdCLEtBQUssRUFBQTtBQUNuRSxJQUFnQjtRQUNkLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQTtBQUNuQixRQUFBLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sR0FBRyxJQUFJLENBQUE7QUFDZixTQUFBO0FBQU0sYUFBQSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ2pELFlBQUEsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO0FBQzVDLFNBQUE7QUFDRCxRQUFBLElBQUksT0FBTztBQUFFLFlBQUEsTUFBTSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQy9DLFFBQUEsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ2xDLFFBQUEsT0FBTyxZQUFZO2NBQ2YsQ0FBQyxJQUFJLFdBQVcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUM7Y0FDakMsS0FBSyxDQUFBO0FBQ1YsS0FLQTtBQUNILENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFFLE1BQWMsRUFBQTtBQUN4QyxJQUFBLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUN2RCxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBRSxTQUFpQixFQUFBO0lBQzNDLE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQzFFLENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFFLEdBQVcsRUFBQTtJQUN2QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQzlCOzs7OyJ9
