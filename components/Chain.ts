import crypto from 'crypto';
import { Block } from './Block';
import { Transaction } from './Transaction';

/**
 * Object representing the blockchain of which there is only one instance/singleton
 */
export class Chain {
    public static instance = new Chain();

    chain: Block[];

    /**
     * Constructor which initialises the blockchain with the 'genesis' block
     */
    constructor() {
        this.chain = [new Block('null', new Transaction(100, 'genesis', 'satoshi'))];
    }

    /**
     * Get last block
     */
    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Function representing the 'mining' of a block by matching a hash
     *
     * @param nonce
     */
    mine(nonce: number) {
        let solution = 1;
        console.log('Mining...');

        while (true) {
            const hash = crypto.createHash('MD5');
            hash.update((nonce + solution).toString()).end();

            const attempt = hash.digest('hex');

            if (attempt.substr(0,4) === '0000') {
                console.log(`Solved: ${solution}`);
                return solution;
            }
            solution +=1;
        }
    }

    /**
     * Function representing verification of signature and public key to add new block to blockchain
     *
     * @param transaction
     * @param senderPublicKey
     * @param signature
     */
    addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
        const verifier = crypto.createVerify('SHA256');
        verifier.update(transaction.toString());

        const isValid = verifier.verify(senderPublicKey, signature);

        if (isValid) {
            const newBlock = new Block(this.lastBlock.hash, transaction);
            this.chain.push(newBlock);
        }
    }
}