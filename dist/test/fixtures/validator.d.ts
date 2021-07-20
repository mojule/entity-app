import { ValidateEntity, ValidateOptions } from '../..';
import { EntityKeys } from '../../entity/types';
export declare type ValEntityA = {
    name: string;
};
export declare type ValEntityB = {
    name: string;
    age: number;
};
export declare type ValidatorEntityMap = {
    a: ValEntityA;
    b: ValEntityB;
};
export declare const validatorEntityKeys: EntityKeys<ValidatorEntityMap>;
export declare const isA: (value: any) => value is ValEntityA;
export declare const isB: (value: any) => value is ValEntityB;
export declare const validator: ValidateEntity<ValidatorEntityMap>;
export declare const createValidatedDb: (options: ValidateOptions) => Promise<{
    memDb: import("../..").EntityDb<ValidatorEntityMap, import("../..").DbItem>;
    validatedDb: import("../..").EntityDb<ValidatorEntityMap, import("../..").DbItem> & {
        collections: import("../..").DbCollections<ValidatorEntityMap, import("../..").DbItem>;
    };
}>;
