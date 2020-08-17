const {
  CommonVariables,
  BidProductFactory,
  BigNumber,
  should,
} = require("./helpers/commons");
const truffleAssert = require("truffle-assertions");

contract("BidProductFactory", (_accounts) => {
  const commonVars = new CommonVariables(_accounts);

  let accounts = commonVars.accounts;

  const _appOwner = commonVars.appOwner;
  const _bidProductMaker = commonVars.bidProductMaker;
  const _participants = commonVars.participants;

  const _bidProductCreationCost = commonVars.bidProductCreationCost;
  const _bidProductReward = commonVars.bidProductReward;
  const _bidProductRewardAndCreationCost = commonVars.bidProductRewardAndCreationCost;

  let bidProductFactory;

  beforeEach(async () => {
    bidProductFactory = await BidProductFactory.new(_bidProductCreationCost, {
      from: _appOwner,
    });
  });

  describe("test cases for createBidProduct function", () => {
    it("The product should have bidproduct ID and address", async () => {
      return bidProductFactory.createBidProduct
        .call(2 , {
          value: _bidProductRewardAndCreationCost,
          from: _bidProductMaker,
        })
        .should.eventually.have.keys("bidProductId", "0", "1", "newBidProductAddress");
    });
    
  });
});
