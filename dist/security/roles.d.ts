import { Role } from './types';
export declare const Roles: Record<Role, Role>;
export declare const hasRole: (roles: string[], role: string) => boolean;
export declare const hasAllRoles: (required: string[], user: string[]) => boolean;
