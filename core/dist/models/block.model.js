"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = exports.Block = void 0;
const crypto_1 = require("crypto");
const utils_1 = require("../utils");
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["UNDEFINED"] = 0] = "UNDEFINED";
    ErrorCode[ErrorCode["INVALID_INDEX"] = 1] = "INVALID_INDEX";
    ErrorCode[ErrorCode["INVALID_PREV_HASH"] = 2] = "INVALID_PREV_HASH";
    ErrorCode[ErrorCode["INVALID_HASH"] = 3] = "INVALID_HASH";
    ErrorCode[ErrorCode["INVALID_STRUCTURE"] = 4] = "INVALID_STRUCTURE";
})(ErrorCode || (ErrorCode = {}));
class Block {
    data;
    hash;
    index;
    prevHash;
    timestamp;
    nonce;
    constructor(block) {
        this.index = block.index;
        this.prevHash = block.prevHash;
        this.timestamp = block.timestamp;
        this.data = block.data;
        this.hash = block.hash;
        this.nonce = block.nonce;
    }
}
exports.Block = Block;
;
class Blockchain {
    genesisBlock = new Block({ index: 0, data: '', prevHash: '0'.repeat(64), hash: '00000097f2d176d77b649f4655c5f735d3fdc6b33219107dae246fa93831f165', timestamp: 1630000000000, nonce: 15951977 });
    chain = [this.genesisBlock];
    difficulty = 6;
    requiredPrefix = '0'.repeat(this.difficulty);
    getBlockchain() {
        return this.chain;
    }
    generateGenezis() {
        return this.findBlock({
            index: 0,
            prevHash: '0'.repeat(64),
            timestamp: 1630000000000,
            data: '',
        });
    }
    generateNextBlock(blockData) {
        const previousBlock = this.getLatestBlock();
        const nextIndex = previousBlock.index + 1;
        const nextTimestamp = new Date().getTime();
        const nextBlock = this.findBlock({
            index: nextIndex,
            prevHash: previousBlock.hash,
            timestamp: nextTimestamp,
            data: blockData,
        });
        return nextBlock;
    }
    replaceChain(newChain) {
        const isValidChain = this.validateChain(newChain) === null;
        if (isValidChain && newChain.length > this.chain.length) {
            this.chain = newChain;
            this.broadcastLatest();
        }
    }
    broadcastLatest() {
        console.log('NEW BLOCK');
        console.log((0, utils_1.getLastItem)(this.chain));
        console.log('');
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    calculateHash(block) {
        return (0, crypto_1.createHash)('sha256').update(block.index + '' + block.timestamp + block.prevHash + block.data + block.nonce, 'utf8').digest('hex');
    }
    validateBlock(newBlock, previousBlock) {
        if (previousBlock.index + 1 !== newBlock.index) {
            return { message: 'Invalid index', code: ErrorCode.INVALID_INDEX };
        }
        else if (previousBlock.hash !== newBlock.prevHash) {
            return { message: 'Invalid previous hash', code: ErrorCode.INVALID_PREV_HASH };
        }
        else if (this.calculateHash(newBlock) !== newBlock.hash) {
            // console.log(typeof (newBlock.hash) + ' ' + typeof calculateHashForBlock(newBlock));
            // console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
            return { message: 'Invalid hash', code: ErrorCode.INVALID_HASH };
        }
        return null;
    }
    ;
    validateChain(chain) {
        if (!(0, utils_1.isEq)(chain[0], this.chain[0])) {
            // TODO: fix error code
            return { message: 'Invalid genesis block', code: ErrorCode.UNDEFINED };
        }
        for (let i = 1; i < chain.length; i++) {
            const err = this.validateBlock(chain[i], chain[i - 1]);
            if (err) {
                // TODO: fix error
                return err;
            }
        }
        return null;
    }
    findBlock(block) {
        let nonce = 0;
        const { index, prevHash, data, timestamp } = block;
        while (true) {
            const hash = this.calculateHash({
                index,
                prevHash,
                data,
                nonce,
                timestamp
            });
            if (hash.startsWith(this.requiredPrefix)) {
                return new Block({
                    index,
                    prevHash,
                    data,
                    nonce,
                    timestamp,
                    hash,
                });
            }
            nonce++;
        }
    }
    ;
    hashMatchesDifficulty(hash) {
        // const hashInBinary: string = hexToBinary(hash);
        return hash.startsWith(this.requiredPrefix);
    }
    ;
}
exports.Blockchain = Blockchain;
//# sourceMappingURL=block.model.js.map