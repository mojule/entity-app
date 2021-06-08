import { ActionType } from '../db/types';
import { IdSchema } from '../schema/types';
import { Role } from './types';
export declare const canAccessSchema: (schema: IdSchema, type: ActionType, currentRoles: Role[]) => boolean;
export declare const canAccessSchemaField: () => void;
