/// <reference types="node" />
import * as Jimp from 'jimp';
import { FileCreateData } from './types';
import { ImageFileEntity } from '../../entity/file';
export declare const processImageFileData: (fileData: FileCreateData) => Promise<{
    imageFile: ImageFileEntity;
    image: Jimp | undefined;
}>;
export declare const getImageDimensions: (mimetype: string, buffer: Buffer) => Promise<{
    width: number;
    height: number;
}>;
