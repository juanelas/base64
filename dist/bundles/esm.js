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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNtLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHMvYnJvd3Nlci1iYXNlNjQudHMiLCIuLi8uLi9zcmMvdHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFPLE1BQU0sWUFBWSxHQUFHLENBQUMsS0FBaUI7SUFDNUMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFBO0lBQ3pCLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxVQUFVLEVBQUU7O1FBRWpELEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDN0U7SUFDRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDM0IsQ0FBQyxDQUFBO0FBRU0sTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFlO0lBQzFDLE9BQU8sSUFBSSxVQUFVLENBQ25CLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDVixLQUFLLENBQUMsRUFBRSxDQUFDO1NBQ1QsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDL0IsQ0FBQTtBQUNILENBQUM7O0FDaEJEOzs7Ozs7QUFjQTs7Ozs7OztTQU9nQixNQUFNLENBQUUsS0FBMkMsRUFBRSxVQUFtQixLQUFLLEVBQUUsVUFBbUIsSUFBSTtJQUNwSCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDQztRQUNkLE1BQU0sS0FBSyxHQUFHLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUTtjQUNwQyxDQUFDLElBQUksV0FBVyxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQztjQUNqQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN6QixNQUFNLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBTTdCO0lBQ0QsSUFBSSxPQUFPO1FBQUUsTUFBTSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9DLElBQUksQ0FBQyxPQUFPO1FBQUUsTUFBTSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2xELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQztBQUVEOzs7Ozs7U0FNZ0IsTUFBTSxDQUFFLE1BQWMsRUFBRSxlQUF3QixLQUFLO0lBQ25EO1FBQ2QsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFBO1FBQ25CLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sR0FBRyxJQUFJLENBQUE7U0FDZjthQUFNLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO1NBQzVDO1FBQ0QsSUFBSSxPQUFPO1lBQUUsTUFBTSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQy9DLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNsQyxPQUFPLFlBQVk7Y0FDZixDQUFDLElBQUksV0FBVyxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQztjQUNqQyxLQUFLLENBQUE7S0FNVjtBQUNILENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFFLE1BQWM7SUFDeEMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ3ZELENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFFLFNBQWlCO0lBQzNDLE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQzFFLENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFFLEdBQVc7SUFDdkMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUM5Qjs7OzsifQ==
