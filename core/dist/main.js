"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_model_1 = require("./models/block.model");
const b = new block_model_1.Blockchain();
const addData = (data) => {
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
//# sourceMappingURL=main.js.map