import { AccessOptions } from '@mojule/mode';
import { EntityDb } from '../../types';
import { SecureEntityMap, SecureDbItem, SecureUser } from './types';
export declare const createAccessOptions: (db: EntityDb<SecureEntityMap, SecureDbItem>, user: SecureUser & SecureDbItem, entity: SecureDbItem, isDirectory: boolean) => Promise<AccessOptions>;
export declare const isUserInGroup: (db: EntityDb<SecureEntityMap, SecureDbItem>, userId: string, groupId: string) => Promise<boolean>;
