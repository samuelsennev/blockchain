const Block = require('./block');

class Blockchain{
    constructor() {
        this.chain = [Block.genesis()];
    }

    /**
     * - Add a block.
     * - Mine it. 
     * - If is valid, push it to the chain.
     * @param {*} data the data we want to store inside a block. 
     * @returns the added block.
     */
    addBlock(data) {
        const block = Block.mine(this.chain[this.chain.length-1], data);
        this.chain.push(block);

        return block;
    }

    /**
     * - Validate the upcoming chain.
     * - Check if the stringified genesis block of this upcoming chain matches 
     * with the stringified genesis block of the main chain.
     * - If matches, then check if every block's hash on this upcoming chain, maches with the hash generated with the same block's data.
     * @param {*} chain an upcoming chain
     * @returns True or False
     */
    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }
        
        for(let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const previousBlock = chain[i - 1];

            if(block.previousHash !== previousBlock.hash || block.hash !== Block.blockHash(block)){
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;