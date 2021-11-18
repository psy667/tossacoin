import { createHash, createPublicKey, createSign, generateKeyPairSync, KeyObject, sign } from "crypto";


const { privateKey, publicKey } = generateKeyPairSync('ec', {
  namedCurve: 'sect239k1'
});


type TxOut = {
  address: string
  amount: number
}

type TxIn = {
  txOutId: string
  txOutIndex: number
  signature: string | null
}

type Transaction = {
  id: string
  txIns: TxIn[]
  txOuts: TxOut[]
}

type UnspentTxOut = {
  txOutId: string
  txOutIndex: number
  address: string
  amount: number
}

class TransactionService {
  private unspentTx: UnspentTxOut[] = [];

  public createTransaction(reciever: string, amount: number) {
    const myAddress = '';
    const unspentTxOutputs: UnspentTxOut[] = this.unspentTx.filter(it => it.address === myAddress)
    
    const txIns: TxIn[] = unspentTxOutputs.map(it => ({
      txOutId: it.txOutId,
      txOutIndex: it.txOutIndex,
      signature: null,
    }));
    
    const balance = unspentTxOutputs.reduce((sum, cur) => sum + cur.amount, 0);

    const txOuts: TxOut[] = [
      {
        address: myAddress,
        amount: balance - amount,
      },
      {
        address: reciever,
        amount: amount,
      }
    ]

    const transaction: Transaction = {
      id: this.getTransactionId(txIns, txOuts),
      txIns: txIns,
      txOuts: txOuts,
    }

    transaction.txIns = txIns.map((it, idx) => ({
      ...it,
      signature: this.signTxIn(transaction, idx, privateKey)
    }));

    return transaction
  }

  public getTransactionId (txIns: TxIn[], txOuts: TxOut[]): string {
    const txInContent: string = txIns
        .map((txIn: TxIn) => txIn.txOutId + txIn.txOutIndex)
        .join('')

    const txOutContent: string = txOuts
        .map((txOut: TxOut) => txOut.address + txOut.amount)
        .join('')

    return createHash('sha256').update(txInContent+''+txOutContent, 'utf8').digest('hex');
  };

  public signTxIn(
    transaction: Transaction,
    txInIndex: number,
    privateKey: KeyObject,
    // unspentTxOuts: UnspentTxOut[]
  ): string {
    const txIn: TxIn = transaction.txIns[txInIndex];
    const dataToSign = transaction.id;
    // const referencedUnspentTxOut: UnspentTxOut = this.findUnspentTxOut(txIn.txOutId, txIn.txOutIndex, unspentTxOuts);
    // const referencedAddress = referencedUnspentTxOut.address;
    // const key = ec.keyFromPrivate(privateKey, 'hex');
    // const publicKey = createPublicKey({
    //   key: privateKey,
    //   format: 'pem'
    // })
    const signature = createSign('SHA256');
    signature.write(dataToSign);
    signature.end();
    return signature.sign(privateKey).toString();

    // const signature: string = toHexString(publicKey.sign(dataToSign).toDER());
    // return signature;
  };

  public findUnspentTxOut(transactionId: string, index: number, unspentTxOuts: UnspentTxOut[]): UnspentTxOut {
    return unspentTxOuts.find((uTxO) => uTxO.txOutId === transactionId && uTxO.txOutIndex === index) as UnspentTxOut;
  };
}

const fakeSign = (id: string, key: string) => '';


const transactions: Transaction[] = [
  {
    id: 'tx1',
    txIns: [],
    txOuts: [{address: 'alice-address',amount: 1000}]
  },
  {
    id: 'tx2',
    txIns: [{ txOutId: 'tx1', txOutIndex: 0, signature: fakeSign('tx1', 'alice-private-key') }],
    txOuts: [{ address: 'bob-address', amount: 200 }, {address: 'alice-address', amount: 800}]
  },
  ////
  {
    id: 'tx3',
    txIns: [{ txOutId: 'tx1', txOutIndex: 0, signature: fakeSign('tx1', 'alice-private-key') }],
    txOuts: [{ address: 'bob-address', amount: 200 }, {address: 'alice-address', amount: 800}]
  }
]

const validate = (tx: Transaction) => {
  const isDoubleSpending = tx.txIns.some(txIn => {
    transactions.find(it => it.txIns.find(i => i.txOutId === txIn.txOutId)) // double spending
    // const txInSum = tx.txIns.reduce((sum, cur) => sum + getTransactionById(cur.txOutId))
  });


}


const getTransactionById = (id: string): Transaction => {
  return null as unknown as Transaction;
}