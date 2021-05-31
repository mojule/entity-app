export declare const errorToObj: (err: Error, includeStack?: boolean) => ErrorObj;
export interface ErrorObj {
    name: string;
    message: string;
    stack?: string;
}
export declare const objToError: (obj: ErrorObj) => Error;
