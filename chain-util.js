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
}

module.exports = ChainUtil;