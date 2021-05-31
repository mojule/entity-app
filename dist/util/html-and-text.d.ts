export declare type LinkTuple = [string, string];
export declare type LinkOrString = string | LinkTuple;
export declare const htmlAndText: (...args: LinkOrString[]) => {
    text: string;
    html: string;
};
