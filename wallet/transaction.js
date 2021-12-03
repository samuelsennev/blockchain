const ChainUtil = require('../chain-util');

class Transaction {
    constructor () {
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    /**
     * Generates a new transaction containing:
     * @param {*} senderWallet - Wallet of the sender's.
     * @param {*} recipient - Wallet of the receiver.
     * @param {*} amount - Amount of coins.
     */
    static newTransaction(senderWallet, recipient, amount) {
        const transaction = new this();

        if(amount > senderWallet.balance) {
            console.log(`Amount: ${amount} exceeds balance!`)
            return;
        }

        //"..." = spread operator
        transaction.outputs.push(...[
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
            { amount, address: recipient }
        ]);

        Transaction.signTransaction(transaction, senderWallet);

        return transaction;
    }

    /**
     * Signs the hashed data from the upcoming transaction with the sender's private key.
     * @param {*} transaction - The upcoming transaction.
     * @param {*} senderWallet - The one that sent the transaction.
     */
    static signTransaction(transaction, senderWallet) {
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
        }
    }

    /**
     * Sends to ChainUtils varifyTransaction function to check if the signature is valid.
     * @param {*} transaction - transaction to verify
     * @returns - if the singature is valid or not.
     */
    static verifyTransaction(transaction) {
        return ChainUtil.verifySignature(
            transaction.input.address, 
            transaction.input.signature,
            ChainUtil.hash(transaction.outputs)
        );
    }
}

module.exports = Transaction;