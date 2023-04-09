/// <reference types="node" />
export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
export declare function encode(input: ArrayBuffer | TypedArray | Buffer | string, urlsafe?: boolean, padding?: boolean): string;
export declare function decode(base64: string, stringOutput?: boolean): Uint8Array | string;
//# sourceMappingURL=index.d.ts.map