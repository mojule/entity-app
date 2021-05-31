export declare const iconDecorator: <T extends IconClassMap>(classMap: T) => void;
export declare type IconWeight = 'solid' | 'regular' | 'light';
export interface IconClassMap {
    create: string;
    edit: string;
    remove: string;
    hierarchySeparator: string;
    view: string;
}
