/**
 * Copyright (c) 2016 Rob Wu <rob@robwu.nl> (https://robwu.nl)
 * Published under a MIT license.
 * https://github.com/Rob--W/zipinfo.js
 **/
/**
 * Reports the metadata of a zip file. This method itself is resilient against
 * malformed zip files, but you should take any result with a pinch of salt
 * since it is trivial to spoof the metadata (which often breaks unzipping).
 *
 * The file must match the format as specified by:
 * https://en.wikipedia.org/wiki/Zip_(file_format)
 * https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT
 *
 * The following zip features are not supported:
 * - ZIP64
 * - Encrypted zip files
 * - Data description headers (=all file sizes will be reported as 0).
 *
 * The first entry is always an artificial '/' directory, and includes the
 * following property:
 * - centralDirectoryStart (number) - The start of the central directory as
 *   claimed by the zip file. If `data` is only a part of the zip file, you
 *   should check whether `centralDirectoryStart < dataStartOffset`, and if so
 *   fetch more data starting from `dataStartOffset` and call this method
 *   again. Otherwise the returned list of files may be incomplete.
 */
export declare const getZipEntries: (data: Uint8Array, dataStartOffset?: number) => ZipEntry[];
export declare type ZipEntry = {
    isDirectory: boolean;
    filename: string;
    uncompressedSize: number;
    centralDirectoryStart?: number;
};
