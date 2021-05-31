import { DocumentTargets } from './types';
import { ClientRoute } from './routes/types';
export declare const createAdmin: (targets: DocumentTargets, routes: ClientRoute[], onSend?: () => void, onRedirect?: () => void) => {
    redirect: (path: string) => void;
};
