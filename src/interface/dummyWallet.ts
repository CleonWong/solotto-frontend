import { Transaction, PublicKey } from "@solana/web3.js";
// import { Wallet } from "@project-serum/anchor"; // Wallet interface is not exposed

export default class DummyWallet {
    async signTransaction(tx: Transaction): Promise<Transaction> {
        return tx;
    }
    
    async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
        return txs;
    }

    get publicKey() {
        return PublicKey.default;
    }
}
