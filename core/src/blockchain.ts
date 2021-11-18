import { createHash } from "crypto";
import {getLastItem, hexToBinary, isEq} from "./utils";


enum ErrorCode {
    UNDEFINED,
    INVALID_INDEX,
    INVALID_PREV_HASH,
    INVALID_HASH,
    INVALID_STRUCTURE,
}

type ValidationError = {
    message?: string,
    code: ErrorCode,
}

export type IBlock = {
    index: number,
    timestamp: number,
    data: string,
    hash: string,
    prevHash: string,
    nonce: number,
}

export class Block implements IBlock {
    data: string;
    hash: string;
    index: number;
    prevHash: string;
    timestamp: number;
    nonce: number;

    constructor(block: IBlock) {
        this.index = block.index;
        this.prevHash = block.prevHash;
        this.timestamp = block.timestamp;
        this.data = block.data;
        this.hash = block.hash;
        this.nonce = block.nonce;
    }
};

export class Blockchain {
    private genesisBlock: Block = new Block({index: 0, data: '', prevHash: '0'.repeat(64), hash: '00000097f2d176d77b649f4655c5f735d3fdc6b33219107dae246fa93831f165', timestamp: 1630000000000, nonce: 15951977})
    private chain: Block[] = [this.genesisBlock];
    private difficulty = 6;
    private requiredPrefix: string = '0'.repeat(this.difficulty);

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

    async generateNextBlock(blockData: IBlock['data']) {
        const previousBlock: Block = this.getLatestBlock();
        const nextIndex: number = previousBlock.index + 1;
        const nextTimestamp: number = new Date().getTime();

        const nextBlock = await this.findBlock({
            index: nextIndex,
            prevHash: previousBlock.hash,
            timestamp: nextTimestamp,
            data: blockData,
        });
        return nextBlock;
    }

    replaceChain(newChain: IBlock[]) {
        const isValidChain = this.validateChain(newChain) === null;

        if(isValidChain && newChain.length > this.chain.length) {
            this.chain = newChain;
            this.broadcastLatest();
        }
    }

    broadcastLatest() {
        // console.log('NEW BLOCK');
        // console.log(getLastItem(this.chain));
        // console.log('');
    }

    private getLatestBlock() {
        return this.chain[this.chain.length-1];
    }

    private calculateHash(block: Omit<IBlock, 'hash'>) {
        return createHash('sha256').update(block.index+''+block.timestamp+block.prevHash+block.data+block.nonce, 'utf8').digest('hex');
    }

    private validateBlock(newBlock: Block, previousBlock: Block): ValidationError | null {
        if (previousBlock.index + 1 !== newBlock.index) {
            return {message: 'Invalid index', code: ErrorCode.INVALID_INDEX};
        } else if (previousBlock.hash !== newBlock.prevHash) {
            return {message: 'Invalid previous hash', code: ErrorCode.INVALID_PREV_HASH};
        } else if (this.calculateHash(newBlock) !== newBlock.hash) {
            // console.log(typeof (newBlock.hash) + ' ' + typeof calculateHashForBlock(newBlock));
            // console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
            return {message: 'Invalid hash', code: ErrorCode.INVALID_HASH};
        }
        return null;
    };

    private validateChain(chain: Block[]): ValidationError | null {
        if(!isEq(chain[0], this.chain[0])) {
            // TODO: fix error code
            return {message: 'Invalid genesis block', code: ErrorCode.UNDEFINED}
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


    private findBlock(block: Omit<IBlock, 'nonce' | 'hash'>): Promise<Block> {
        const { index, prevHash, data, timestamp } = block;

        return new Promise(resolve => {
            const iter = (initNonce: number) => {
                for (let nonce = initNonce; nonce < initNonce + 10000; nonce++) {
                    const hash: string = this.calculateHash({
                        index,
                        prevHash,
                        data,
                        nonce,
                        timestamp
                    });
        
                    if (hash.startsWith(this.requiredPrefix)) {
                        resolve(new Block({
                            index,
                            prevHash,
                            data,
                            nonce,
                            timestamp,
                            hash,
                        }));
                        return;
                    }
                }
                
                setImmediate(() => iter(initNonce + 10000))
            }

            iter(0);
        });
    };

    private hashMatchesDifficulty(hash: string): boolean {
        // const hashInBinary: string = hexToBinary(hash);
        return hash.startsWith(this.requiredPrefix);
    };
}

