const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY, MINE_RATE } = require('../config');

/**
 * Block class.
 * Its where we generate blocks and use all of its functionalities.
 */
class Block {
    constructor(timestamp, previousHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
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
        Difficulty    : ${this.difficulty}
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
        return new this('none', 'none', Block.generateHash('none', '', []), 'Genesis Block', 0, DIFFICULTY);
    }

    /**
    * - Mine a block by Proof-of-work.
     * @param {*} previousBlock - previous block it self
     * @param {*} data - the data we want to store inside the mined block
     * @returns - New instance of class Block 
     */
    static mine(previousBlock, data) {
        let blockHash, timestamp;
        const previousHash = previousBlock.hash;
        let { difficulty } = previousBlock;
        let nonce = 0;
        
        do {
            nonce++;
            timestamp = Date.now();
            //adjusting the difficulty based on the timestamp of the previousBlock
            difficulty = Block.adjustDifficulty(previousBlock, timestamp)
            blockHash = Block.generateHash(timestamp, previousHash, data, nonce, difficulty);
        } while (blockHash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, previousHash, blockHash, data, nonce, difficulty);
    }

    /**
     * Generate the block's hash.
     * @param {*} timestamp 
     * @param {*} previousHash 
     * @param {*} data 
     * @returns the SHA256 hash itself.
     */
    static generateHash(timestamp, previousHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${previousHash}${data}${nonce}${difficulty}`).toString();
    }

    /**
     * Check if the block's hash coming from an upcoming chain 
     * matches with a hash generated with the same data of the block we want to check.
     * @param {*} block 
     * @returns - the hash itself
     */
    static blockHash(block) {
        const { timestamp, previousHash, data, nonce, difficulty } = block;
        return Block.generateHash(timestamp, previousHash, data, nonce, difficulty);
    }

    /**
     * - Check if the mining difficulty.
     * - If the mining period is low, then increase its difficulty. Else, decrease it.
     * @param {*} previousBlock 
     * @param {*} currentTime 
     * @returns difficulty
     */
    static adjustDifficulty(previousBlock, currentTime) {
        let { difficulty } = previousBlock;
        difficulty = previousBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1
        return difficulty;

        // console.log(`${previousBlock.timestamp + MINE_RATE} = ${currentTime}`);
    }
}

module.exports = Block;