const Blockchain = require('./blockchain');
const Block = require('./block');

// let mainBlockchain = new Blockchain();
// let upcomingBlockchain = new Blockchain();

// if(mainBlockchain.chain[0] === Block.genesis()){
//     console.log('it starts with genesis block!');
// }

// const data = 'just another data';
// mainBlockchain.addBlock(data);

// if(mainBlockchain.chain[mainBlockchain.chain.length-1] === (data)){
//     console.log('it adds a new block');
// }

// upcomingBlockchain.addBlock('foo');

// if(mainBlockchain.isValidChain(upcomingBlockchain.chain) === true){
//     console.log('it validates the chain');
// }

// // describe('Blockchain', () => {
// //     let mainBlockchain;

// //     beforeEach(() => {
// //         mainBlockchain = new Blockchain();
// //         upcomingBlockchain = new Blockchain();
// //     });

// //     it('starts with genesis block', () => {
// //         expect(mainBlockchain.chain[0]).toEqual(Block.genesis());
// //     });

// //     it('adds a new block', () => {
// //         const data = 'Just another data';
// //         mainBlockchain.addBlock(data);

// //         expect(mainBlockchain.chain[mainBlockchain.chain.length-1].data).toEqual(data);
// //     });

// //     it('validates a valid chain', () => {
// //         upcomingBlockchain.addBlock('foo');

// //         expect(mainBlockchain.isValidChain(upcomingBlockchain.chain)).toBe(true);
// //     });
// // });