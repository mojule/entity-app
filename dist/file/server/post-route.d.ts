import { Handler } from 'express-serve-static-core';
import { FileCreateData } from '../storage/types';
export declare const createFileHandlers: (createDiskFile: (fileData: FileCreateData) => Promise<string>) => Handler[];
