"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmConvertToUTCTime = void 0;
function cmConvertToUTCTime(date) {
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
exports.cmConvertToUTCTime = cmConvertToUTCTime;
