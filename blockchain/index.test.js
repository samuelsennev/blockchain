const Blockchain = require('./index');
const Block = require('./block');

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

    it('invalidates a chain with a corrupt genesis block', () => {
        upcomingBlockchain.chain[0] = 'Bad data';

        expect(mainBlockchain.isValidChain(upcomingBlockchain.chain)).toBe(false);
    });

    it('invalidates a corrupt chain', () => {
        upcomingBlockchain.addBlock('foo');
        upcomingBlockchain.chain[1] = 'Not foo';

        expect(mainBlockchain.isValidChain(upcomingBlockchain.chain)).toBe(false);
    });

    it('replaces the chain with a valid chain', () => {
        upcomingBlockchain.addBlock('goo');
        mainBlockchain.replaceChain(upcomingBlockchain.chain);

        //Replace current chain if upcomingBlockchain is longer than the mainBlockchain, and if it's valid.
        expect(mainBlockchain.chain).toEqual(upcomingBlockchain.chain);
    });

    it('does not replace the chain with one of less than or equal to length', () => {
        mainBlockchain.addBlock('foo');
        mainBlockchain.replaceChain(upcomingBlockchain.chain);

        expect(mainBlockchain.chain).not.toEqual(upcomingBlockchain.chain);
    });
});