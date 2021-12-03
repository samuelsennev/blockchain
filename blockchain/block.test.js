const Block = require('./block');

/**
 * @function describe - Jest function used to test some code
 * @param {*} testDescription - first parameter
 * @param {*} testItself - second parameter
 */
describe('Block', () => {
    /**
     * Declaring globals variables;
     */
    let data, previousBlock, block;

    /**
     * @function beforeEach - Jest function used to host some code functionalities, instead of
     * coding it inside of every test ("it()")
     */
    beforeEach(() => {
        data = 'Just another data';
        previousBlock = Block.genesis();
        block = Block.mine(previousBlock, data);
    });

    /**
     * @function it - Jest function that represents the test itself, and also receive as  
     * second parameter a callback error function inside it, represented as "() => {}"
     */
    it('sets the `data` to match the input', () => {
        expect(block.data).toEqual(data);
    });

    it('sets the `previousHash` to match the hash of the last block', () => {
        expect(block.previousHash).toEqual(previousBlock.hash);
    });

    it('generates a hash that matches de difficulty', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });
    
    it('lowers the difficulty ofr slowly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamps+360000)).toEqual(block.difficulty-1);
    });
    
    it('rases the difficulty for quickly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp+1)).toEqual(block.difficulty+1);
    });
});