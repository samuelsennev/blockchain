const Blockchain = require('../blockchain');
const Block = require('../block');

describe('Blockchain', () => {
    let mainBlockchain;

    beforeEach(() => {
        mainBlockchain = new Blockchain();
        upcomingBlockchain = new Blockchain();
    });

    it('starts with genesis block', () => {
        expect(mainBlockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = 'Just another data';
        mainBlockchain.addBlock(data);

        expect(mainBlockchain.chain[mainBlockchain.chain.length-1].data).toEqual(data);
    });

    it('validates a valid chain', () => {
        upcomingBlockchain.addBlock('foo');

        expect(mainBlockchain.isValidChain(upcomingBlockchain.chain)).toBe(true);
    });
});