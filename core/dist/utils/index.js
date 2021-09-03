"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastItem = exports.hexToBinary = exports.isEq = void 0;
const isEq = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
exports.isEq = isEq;
const hexToBinary = (hex) => parseInt(hex, 16).toString(2).padStart(256, '0');
exports.hexToBinary = hexToBinary;
const getLastItem = (arr) => arr[arr.length - 1];
exports.getLastItem = getLastItem;
//# sourceMappingURL=index.js.map