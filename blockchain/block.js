const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY } = require('../config');

/**
 * Block class.
 * Its where we generate blocks and use all of its functionalities.
 */
class Block {
    constructor(timestamp, previousHash, hash, data, nonce) {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    /**
     * - Transform into string all the block data.
     * @returns the block data.
     */
    toString() {
        return `Block - 
        Timestamp     : ${this.timestamp}
        Previous Hash : ${this.previousHash}
        Hash          : ${this.hash}
        Nonce         : ${this.nonce}
        Data          : ${this.data}`;
    }

    /**
     * - Generate Genesis Block.
     * - 'static' identifier will be used to enable ourselfs to call 'genesisBlock' function
     * whitout having to make a new instance of the Block class (... new Block().genesisBlock())
     * - To use it, just export the Block module and type: Block.genesisBlock().
     * @returns the genesis block
     */
    static genesis() {
        return new this('none', 'none', Block.generateHash('none', '', []), 'Genesis Block', 0);
    }

    /**
    * - Mine a block by Proof-of-work.
     * @param {*} previousBlock - previous block it self
     * @param {*} data - the data we want to stor inside the mined block
     * @returns - New instance of class Block 
     */
    static mine(previousBlock, data) {
        let blockHash, timestamp;
        const previousHash = previousBlock.hash;
        let nonce = 0;
        
        do {
            nonce++;
            timestamp = Date.now();
            blockHash = Block.generateHash(timestamp, previousHash, data, nonce);
        } while (blockHash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

        return new this(timestamp, previousHash, blockHash, data, nonce);
    }

    /**
     * Generate the block's hash.
     * @param {*} timestamp 
     * @param {*} previousHash 
     * @param {*} data 
     * @returns the SHA256 hash itself.
     */
     static generateHash(timestamp, previousHash, data, nonce) {
        return SHA256(`${timestamp}${previousHash}${data}${nonce}`).toString();
    }

    /**
     * Check if the block's hash coming from an upcoming chain 
     * matches with a hash generated with the same data of the block we want to check.
     * @param {*} block 
     * @returns - the hash itself
     */
    static blockHash(block) {
        const { timestamp, previousHash, data, nonce } = block;
        return Block.generateHash(timestamp, previousHash, data, nonce);
    }
}

module.exports = Block;