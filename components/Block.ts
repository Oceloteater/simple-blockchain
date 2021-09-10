import crypto from 'crypto';
import { Transaction } from './Transaction';

/**
 * Object representing a block containing one transaction on the blockchain
 */
export class Block {
    public nonce = Math.round(Math.random() * 999999999);

    /**
     * Constructor
     *
     * @param prevHash
     * @param transaction
     * @param ts
     */
    constructor(
        public prevHash: string,
        public transaction: Transaction,
        public ts = Date.now()
    ) {}

    /**
     * Create hash based on previous hash, transaction and date
     */
    get hash() {
        const str = JSON.stringify(this);
        const hash = crypto.createHash('SHA256');
        hash.update(str).end();

        return hash.digest('hex');
    }
}