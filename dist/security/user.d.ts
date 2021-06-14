import { UserData } from '..';
export declare const createUserEntity: (data: UserData, password: string) => Promise<{
    [x: string]: unknown;
    password: string;
    name: string;
    email: string;
    roles: string[];
}>;
