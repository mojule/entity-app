import { Role, RoleMap } from './types';
export declare const Roles: Record<Role, Role>;
export declare const hasRole: (roles: string[], role: string) => boolean;
export declare const hasAllRoles: (required: string[], user: string[]) => boolean;
export declare const addRolesToSchema: <T>(schema: T, roles: RoleMap, propertyRoles?: Record<string, RoleMap> | undefined) => T & {
    _esRoles: RoleMap;
};
