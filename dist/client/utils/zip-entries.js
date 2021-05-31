"use strict";
/**
 * Copyright (c) 2016 Rob Wu <rob@robwu.nl> (https://robwu.nl)
 * Published under a MIT license.
 * https://github.com/Rob--W/zipinfo.js
 **/
/* globals DataView, TextDecoder, Buffer, module */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZipEntries = void 0;
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
const getZipEntries = (data, dataStartOffset = 0) => {
    const view = new DataView(data.buffer, data.byteOffset, data.length);
    let entriesLeft = 0;
    let offset = 0;
    let endoffset = data.length;
    // Find EOCD (0xFFFF is the maximum size of an optional trailing comment).
    for (let i = data.length - 22, ii = Math.max(0, i - 0xFFFF); i >= ii; --i) {
        if (data[i] === 0x50 && data[i + 1] === 0x4b &&
            data[i + 2] === 0x05 && data[i + 3] === 0x06) {
            endoffset = i;
            offset = view.getUint32(i + 16, true);
            entriesLeft = view.getUint16(i + 8, true);
            break;
        }
    }
    const entries = [
        {
            isDirectory: true,
            filename: '/',
            uncompressedSize: 0,
            centralDirectoryStart: offset,
        }
    ];
    if (dataStartOffset) {
        offset -= dataStartOffset;
    }
    if (offset >= data.length || offset <= 0) {
        // EOCD not found or malformed. Try to recover if possible (the result is
        // most likely going to be incomplete or bogus, but we can try...).
        offset = -1;
        entriesLeft = 0xFFFF;
        while (++offset < data.length && data[offset] !== 0x50 &&
            data[offset + 1] !== 0x4b && data[offset + 2] !== 0x01 &&
            data[offset + 3] !== 0x02) { }
    }
    endoffset -= 46; // 46 = minimum size of an entry in the central directory.
    while (--entriesLeft >= 0 && offset < endoffset) {
        if (view.getUint32(offset) != 0x504b0102)
            break;
        const bitFlag = view.getUint16(offset + 8, true);
        const uncompressedSize = view.getUint32(offset + 24, true);
        const fileNameLength = view.getUint16(offset + 28, true);
        const extraFieldLength = view.getUint16(offset + 30, true);
        const fileCommentLength = view.getUint16(offset + 32, true);
        const filenameBytes = data.subarray(offset + 46, offset + 46 + fileNameLength);
        const encoding = (bitFlag & 0x800) ? 'utf-8' : 'ascii';
        const filename = decodeFilename(filenameBytes, encoding);
        entries.push({
            isDirectory: filename.endsWith('/'),
            filename,
            uncompressedSize,
        });
        offset += 46 + fileNameLength + extraFieldLength + fileCommentLength;
    }
    return entries;
};
exports.getZipEntries = getZipEntries;
const decodeFilename = (filenameBytes, encoding) => new TextDecoder(encoding).decode(filenameBytes);
//# sourceMappingURL=zip-entries.js.map