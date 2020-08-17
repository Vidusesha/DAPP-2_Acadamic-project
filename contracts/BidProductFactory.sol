// SPDX-License-Identifier: MIT

pragma solidity >0.4.0 <0.7.0;
pragma experimental ABIEncoderV2;


import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract BidProductFactory is Ownable {

    using SafeMath for uint;
    uint public createBidFees;
    address[] public bidProductAddress;
    uint public productCount = 0;
    struct BidProductStruct{
        address productOwner;
        string productName;
        uint bidMultiplier;
        uint productPrice;
    }
    mapping(uint => address) public bidProductToOwner;
    mapping(uint => BidProductStruct)public bidProducts;
    event BidProductinitialized(uint indexed createBidFees);
    event BidProductCreated(uint indexed bidProductId , address indexed bidAddress);


    constructor(uint _createBidFees) public {
        createBidFees = _createBidFees;
        emit BidProductinitialized(createBidFees);
    }

    modifier notTheOwner(){
        require(msg.sender != owner(),"BidProductFactory: restricted");
        _;
    }

    function createBidProduct(uint _bidProductPrice , uint _bidMultiplier , string memory _bidProductName ) external notTheOwner payable {
        require(msg.value > createBidFees,"BidProductFactory: Not enough ethers");
        BidProductStruct memory bidProd = BidProductStruct(msg.sender , _bidProductName , _bidMultiplier ,_bidProductPrice);
        bidProducts[productCount] = bidProd;
        bidProductToOwner[productCount] = msg.sender;
        bidProductAddress.push(msg.sender);
        productCount = productCount + 1;
        emit BidProductCreated(productCount - 1,msg.sender);
    }

    function getAllBidProduct() public view returns(address[] memory){
        return bidProductAddress;
    }

    function checkBidProductPrice(uint _bidProductId , uint _price)public view returns(bool){
        BidProductStruct memory bidProd = bidProducts[_bidProductId];
        if(_price == (bidProd.bidMultiplier.mul(bidProd.productPrice))){
            return true;
        }
        else{
            return false;
        }
    }

    function changeOwnership(uint _bidProductId) public payable returns(bool){
            bidProducts[_bidProductId].productOwner = msg.sender;
            return true;
    }

    function getBidProductName(uint _bidProductId) public view returns(string memory){
        return bidProducts[_bidProductId].productName;
    }

    function getBidProductPrice(uint _bidProductId) public view returns(uint){
        return bidProducts[_bidProductId].productPrice;
    }

    function getBidMultiplier(uint _bidProductId) public view returns(uint){
        return bidProducts[_bidProductId].bidMultiplier;
    }

    function getBidProductOwner(uint _bidProductId) public view returns(address){
        return bidProducts[_bidProductId].productOwner;
    }
    
}
