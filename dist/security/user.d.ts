import { UserData, UserEntity } from './entity/user';
export declare const createUserEntity: (data: UserData, password: string) => Promise<UserEntity>;
