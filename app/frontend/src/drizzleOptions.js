import Web3 from "web3";
import BidProductFactory from "./contracts/BidProductFactory.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("http://127.0.0.1:7545"),
  },
  contracts: [BidProductFactory],
  events: {
    BidProductFactory: ["BidProductinitialized","BidProductCreated"],
  },
};

export default options;
