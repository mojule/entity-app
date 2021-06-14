export declare type Role = 'admin' | 'user' | 'currentUser' | 'public';
export declare type PropertyAccess = 'create' | 'read' | 'update';
export declare type EntityAccess = PropertyAccess | 'delete';
export declare type RoleMap = Record<EntityAccess, Role[]>;
