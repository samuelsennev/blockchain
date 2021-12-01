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
});