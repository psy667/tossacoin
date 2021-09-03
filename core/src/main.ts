import { Blockchain } from "./models/block.model";
import { getLastItem } from "./utils";

const b = new Blockchain();

const addData = (data: string) => {
  const chain = b.getBlockchain();
  const newBlock = b.generateNextBlock(data);
  b.replaceChain([...chain, newBlock]);
};

while (true) {
  const data = Math.random().toString(16).slice(2);
  console.time(data);
  addData(data);
  console.timeEnd(data);
}
