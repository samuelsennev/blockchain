const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const { v1: uuidv1 } = require('uuid');

//Standards of Efficiency Cryptography - Prime 256 to 256bits - Koblenz
const ec = new EC('secp256k1');

class ChainUtil {
    /**
     * Generates key pair using elliptic
     * @returns the key pair
     */
    static genKeyPair() {
        return ec.genKeyPair();
    }

    /**
     * Generates an unique id from 'uuid/dist/v1'
     * @returns unique id
     */
    static id() {
        return uuidv1();
    }

    static hash(data) {
        return SHA256(JSON.stringify(data)).toString();
    }

    /**
     * - Checks if the signature is valid using ec's lib functions.
     * - As the publicKey is coded using 'hex', keyFromPublic needs the 'hex' parameter to decode it.
     * - dataHash will be used as an expected hash after signature's decryption.
     * @param {*} publicKey - the publicKey itself, coded by 'hex'.
     * @param {*} signature - sender's signature (privateKey).
     * @param {*} dataHash - the hashed data used as a matching parameter after signature's decryption by publicKey (his perfect key pair).
     * @returns 
     */
    static verifySignature(publicKey, signature, dataHash) {
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }
}

module.exports = ChainUtil;