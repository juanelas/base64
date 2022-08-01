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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNtLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHMvYnJvd3Nlci1iYXNlNjQudHMiLCIuLi8uLi9zcmMvdHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFPLE1BQU0sWUFBWSxHQUFHLENBQUMsS0FBaUIsS0FBWTtJQUN4RCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUE7SUFDekIsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFBO0FBQ2QsSUFBQSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksVUFBVSxFQUFFOztRQUVqRCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzdFLEtBQUE7SUFDRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDM0IsQ0FBQyxDQUFBO0FBRU0sTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFlLEtBQWdCO0FBQzFELElBQUEsT0FBTyxJQUFJLFVBQVUsQ0FDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNWLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFDVCxTQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQy9CLENBQUE7QUFDSCxDQUFDOztBQ2hCRDs7Ozs7QUFLRztBQVNIOzs7Ozs7QUFNRztBQUNHLFNBQVUsTUFBTSxDQUFFLEtBQTJDLEVBQUUsT0FBbUIsR0FBQSxLQUFLLEVBQUUsT0FBQSxHQUFtQixJQUFJLEVBQUE7SUFDcEgsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0FBQ2YsSUFBZ0I7QUFDZCxRQUFBLE1BQU0sS0FBSyxHQUFHLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUTtjQUNwQyxDQUFDLElBQUksV0FBVyxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNuQyxjQUFFLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3pCLFFBQUEsTUFBTSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUM3QixLQUtBO0FBQ0QsSUFBQSxJQUFJLE9BQU87QUFBRSxRQUFBLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMvQyxJQUFBLElBQUksQ0FBQyxPQUFPO0FBQUUsUUFBQSxNQUFNLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDbEQsSUFBQSxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUM7QUFFRDs7Ozs7QUFLRztTQUNhLE1BQU0sQ0FBRSxNQUFjLEVBQUUsZUFBd0IsS0FBSyxFQUFBO0FBQ25FLElBQWdCO1FBQ2QsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFBO0FBQ25CLFFBQUEsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekMsT0FBTyxHQUFHLElBQUksQ0FBQTtBQUNmLFNBQUE7QUFBTSxhQUFBLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDakQsWUFBQSxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUE7QUFDNUMsU0FBQTtBQUNELFFBQUEsSUFBSSxPQUFPO0FBQUUsWUFBQSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDL0MsUUFBQSxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDbEMsUUFBQSxPQUFPLFlBQVk7Y0FDZixDQUFDLElBQUksV0FBVyxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQztjQUNqQyxLQUFLLENBQUE7QUFDVixLQUtBO0FBQ0gsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUUsTUFBYyxFQUFBO0FBQ3hDLElBQUEsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ3ZELENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFFLFNBQWlCLEVBQUE7SUFDM0MsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDMUUsQ0FBQztBQUVELFNBQVMsbUJBQW1CLENBQUUsR0FBVyxFQUFBO0lBQ3ZDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDOUI7Ozs7In0=
