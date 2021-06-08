import { Role } from '../../security/types';
import { Handler } from 'express';
export declare const createRolesHandler: (requiredRoles: Role[]) => Handler;
