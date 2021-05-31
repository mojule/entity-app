export declare const emptyObject: (obj: any) => void;
export declare const objectExcept: (obj: any, ...keys: string[]) => {};
export declare const objectFilter: <T, TResult = T>(obj: T, predicate: (key: string, value: any) => boolean) => TResult;
