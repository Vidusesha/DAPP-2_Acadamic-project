import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import { toast } from "react-toastify";
import image from './backGrnd.jpg';
const { ContractData } = newContextComponents;

var styles = {
color:'black',
backgroundImage: 'url('+  image  +')'
};

export default ({ drizzle, drizzleState }) => {
  const [products, setProducts] = React.useState([]);
  const [values, setValue] = React.useState();
  const [accountName, setAccountName] = React.useState();
  const [currentAccount, setCurrentAccount] = React.useState(
    drizzleState.accounts[0]
  );

  const handleCreateProduct = () => {
    const tx = drizzle.contracts.BidProductFactory.methods.createBidProduct(1 , 2 , "Product1").send({
      value: "4" ,
      from: currentAccount,
      gasLimit: 2100000,
    });
    tx.then(({ events }) => {
      products.unshift(events.BidProductFactory.returnValues["bidAddress"]);
      toast.success("Success", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch((error) => {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const handleBuyProduct = (addr) => {
    const tx = drizzle.contracts.BidProductFactory.methods.checkBidProductPrice(addr , 2).call({
      from: currentAccount,
      gasLimit: 2100000,
    });
    tx.then(( result ) => {
      console.log(result);
      if(!result){
        toast.error("Not enough bid", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else{
        const tx2 = drizzle.contracts.BidProductFactory.methods.changeOwnership(addr).send({
          from: currentAccount,
          gasLimit: 2100000,
        });
        tx2.then(( result1 ) => {
          toast.success("Success", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }).catch((error) => {
           toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    });
      }
      
    }).catch((error) => {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    });
  };

  const handleOnChange = (event) => {
    setCurrentAccount(event.target.value);
    var index = event.target.selectedIndex;
    setAccountName(event.target[index].text);
  };

  const handleChangeText = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    async function getAllProducts() {
      const prodArr = await drizzle.contracts.BidProductFactory.methods
        .getAllBidProduct()
        .call();
      // Because the array is frozen in strict mode, you'll need to copy the array before sorting it:
      // https://stackoverflow.com/a/53420326
      setProducts(prodArr.slice());
      console.log(prodArr);
    }
    getAllProducts();
  });
  // destructure drizzle and drizzleState from props

  return (
    <div className="App"  style={styles}>
      <header>
        <h1>Tink</h1>
        </header>
      <div>
        <h2>Bidding Market</h2>
      </div>

      <div>
        <label htmlFor="account-select">Choose an account:</label>
        <select
          name="accounts"
          id="account-select"
          value={currentAccount}
          onChange={handleOnChange}
        >
          {Object.keys(drizzleState.accounts).map((x, index) => (
            <option key={x} value={drizzleState.accounts[index]}>
              {drizzleState.accounts[index]}
            </option>
          ))}
        </select>
      </div>
            <br></br>
      <div>
      <div ref={element => { 
             if (element) element.style.setProperty('opacity', '1', 'important'); 
           }}
        >
        <div>
          <div>Product creation fees : </div>
          <div>
            <ContractData
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="BidProductFactory"
              method="createBidFees"
            />{" "}
            Ether
          </div><br></br>
          <input type="text" onChange={handleChangeText}></input>
          <button onClick={handleCreateProduct}>Create Product</button>
        </div>
        <div>
          <strong>Product List</strong>
          <div>
              {products.map((prodAddr, index) => (
                <>
                  <div>
                  <ContractData
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                      contract="BidProductFactory"
                      method="getBidProductName"
                      methodArgs={[`${index}`]}
                    />
                  </div><br></br>
                    <div>
                     Owner: 
                    <ContractData
                       drizzle={drizzle}
                       drizzleState={drizzleState}
                       contract="BidProductFactory"
                       method="getBidProductOwner"
                       methodArgs={[`${index}`]}
                     /></div><br></br>
                     <div>
                    Product Price :
                    <ContractData
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                      contract="BidProductFactory"
                      method="getBidProductPrice"
                      methodArgs={[`${index}`]}
                    /><br></br>
                    <div>
                      Enter the bid price:
                      <input type="text" onChange=""></input>
                      <button onClick={() => { handleBuyProduct(index) }}>Bid</button>
                      </div>
                  </div>
                  </>
              ))}
        </div>
        </div>
      </div>
      </div>
      </div>
  );
};