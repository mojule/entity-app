import { IdSchema } from '../schema/types';
import { Role } from './types';
import { ActionType } from '../server/routes/types';
export declare const canAccessSchema: (schema: IdSchema, type: ActionType, currentRoles: Role[]) => boolean;
export declare const canAccessSchemaField: () => void;
