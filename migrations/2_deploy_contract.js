const BidProductFactory = artifacts.require("BidProductFactory");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(BidProductFactory, web3.utils.toBN("1", "ether"));
};
