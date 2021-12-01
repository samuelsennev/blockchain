const SHA256 = require('crypto-js/sha256');

/**
 * Block class.
 * Its where we generate blocks and use all of its functionalities.
 */
class Block {
    constructor(timestamp, previousHash, hash, data) {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
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
        return new this('Genesis timestamp', 'none', Block.generateHash('Genesis timestamp', '', []), []);
    }

    /**
    * - Mine a block.
     * @param {*} previousBlock - previous block it self
     * @param {*} data - the data we want to stor inside the mined block
     * @returns - New instance of class Block 
     */
    static mine(previousBlock, data) {
        const timestamp = Date.now();
        const previousHash = previousBlock.hash;
        const minedBlockHash = Block.generateHash(timestamp, previousHash, data);

        return new this(timestamp, previousHash, minedBlockHash, data);
    }

    /**
     * Generate the block's hash.
     * @param {*} timestamp 
     * @param {*} previousHash 
     * @param {*} data 
     * @returns the SHA256 hash itself.
     */
     static generateHash(timestamp, previousHash, data) {
        return SHA256(`${timestamp}${previousHash}${data}`).toString();
    }

    /**
     * Check if the block's hash coming from an upcoming chain 
     * matches with a hash generated with the same data of the block we want to check.
     * @param {*} block 
     * @returns - the hash itself
     */
    static blockHash(block) {
        const { timestamp, previousHash, data } = block;
        return Block.generateHash(timestamp, previousHash, data);
    }
}

module.exports = Block;