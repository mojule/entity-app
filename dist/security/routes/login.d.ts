import { PassportStatic } from 'passport';
import { Route } from '../../server/routes/types';
import { LoginOptions } from './types';
export declare const createSecurityLoginRoutes: (passport: PassportStatic, options?: LoginOptions) => Promise<{
    login: Route<any>;
    logout: Route<any>;
}>;
