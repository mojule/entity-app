export declare const normalizeArray: (parts: string[], allowAboveRoot?: boolean) => string[];
export declare const resolve: (...args: string[]) => string;
export declare const normalize: (path: string) => string;
export declare const isAbsolute: (path: string) => boolean;
export declare const join: (...args: string[]) => string;
export declare const parse: (pathString: string) => {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
};
