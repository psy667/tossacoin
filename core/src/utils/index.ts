export const isEq = (obj1: any, obj2: any): boolean => JSON.stringify(obj1) === JSON.stringify(obj2);
export const hexToBinary = (hex: string): string => parseInt(hex, 16).toString(2).padStart(256, '0');
export const getLastItem = <T>(arr: T[]): T => arr[arr.length - 1];