const _ = require("lodash");
const BidProductFactory = artifacts.require("BidProductFactory");
const BigNumber = web3.utils.BN;

const should = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should(); //To enable should chai style

class CommonVariables {
  constructor(_accounts) {
    this.accounts = _accounts;
    this.bidProductMaker = _accounts[0];
    this.appOwner = _accounts[1];
    this.participants = _.difference(_accounts, [_accounts[0], _accounts[1]]);

    this.bidProductCreationCost = web3.utils.toWei("1", "ether");
    this.bidProductReward = web3.utils.toWei("1", "ether");
    this.bidProductRewardAndCreationCost = web3.utils.toWei("2", "ether");
  }
}

module.exports = {
  CommonVariables,
  BidProductFactory,
  BigNumber,
  should,
};
