import { Block, Blockchain } from "./blockchain";
import { getLastItem } from "./utils";

const b = new Blockchain();

const isTimer = (n: NodeJS.Timer | undefined): n is NodeJS.Timer  => {
  return !!n;
}
export class TossaCoin {
  isMiningOn = false;

  mine(onData: Function) {
    setTimeout(async () => {
      const data = Math.random().toString(16).slice(2);
      const result = await addData(data);
      onData(result);
      if (this.isMiningOn) {
        this.mine(onData);
      }
    }, 0);
  }

  startMining(onData: Function) {
    this.isMiningOn = true;
    this.mine(onData);
  }

  stopMining() {
    this.isMiningOn = false;
  }

  createWallet() {

  }

  signin() {

  }

  getBalance() {

  }

  getTransactionHistory() {
      
  }

  transfer() {

  }
}

const addData = async (data: string): Promise<Block[]> => {
  const chain = b.getBlockchain();
  const newBlock = await b.generateNextBlock(data);
  b.replaceChain([...chain, newBlock]);
  return b.getBlockchain();
};

// const a = new TossaCoin();

// a.startMining(console.log)

// a.isMining = true;
// a.mine();

// setTimeout(() => a.stopMining(), 5000)