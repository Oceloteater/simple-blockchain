import crypto from 'crypto';
import { Chain } from './Chain';
import { Transaction } from './Transaction';

/**
 * Object representing a customers wallet
 */
export class Wallet {
    public publicKey: string;
    public privateKey: string;

    /**
     * Constructor which creates a linked public and private key pairing using RSA
     */
    constructor() {
        const keyPair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        });

        this.publicKey = keyPair.publicKey;
        this.privateKey = keyPair.privateKey;
    }

    /**
     * Function writing a new block to the blockchain complete with transaction and signature
     *
     * @param amount
     * @param payeePublicKey
     */
    sendMoney(amount: number, payeePublicKey: string) {
        const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();

        const signature = sign.sign(this.privateKey);
        Chain.instance.addBlock(transaction, this.publicKey, signature);
    }
}