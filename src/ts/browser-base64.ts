export const base64Encode = (bytes: Uint8Array): string => {
  const CHUNK_SIZE = 0x8000
  const arr = []
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    // @ts-expect-error
    arr.push(String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK_SIZE)))
  }
  return btoa(arr.join(''))
}

export const base64Decode = (encoded: string): Uint8Array => {
  return new Uint8Array(
    atob(encoded)
      .split('')
      .map((c) => c.charCodeAt(0))
  )
}
