const { Contract } = require('ethers');
var fs = require('fs');

const contractPath = '../build/contracts/BulldogTestyClub.json'

var Web3 = require('web3');
const alchemyKey = fs.readFileSync("../.alchemyKey").toString().trim();
var web3 = new Web3(`https://polygon-mainnet.g.alchemy.com/v2/`+alchemyKey);
const mnemonic = fs.readFileSync("../.mnemonic").toString().trim();

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });


async function main(){
    
   
    var data =  fs.readFileSync(contractPath);
    var contractJson = JSON.parse(data);
    var address = contractJson.networks[137].address;
    var abi = contractJson.abi;
    var contract = new web3.eth.Contract(abi, address);
    var baseURI = "https://ipfs.io/ipfs/"
    await setBaseURI(baseURI);

    var baseURIResult = await contract.methods.baseURI().call();
    console.log(baseURIResult)

}



async function setBaseURI(baseURI){
    var data =  fs.readFileSync(contractPath);
    var contractJson = JSON.parse(data);
    var address = contractJson.networks[137].address;
    var abi = contractJson.abi;
    var contract = new web3.eth.Contract(abi, address);
    

    var encodeABI = contract.methods.setBaseURI(baseURI).encodeABI();
    var signResult = await web3.eth.accounts.signTransaction({
        gas: 3000000,
        to: address,
        data: encodeABI,
        gasPrice: await web3.eth.getGasPrice()
    }, mnemonic);
    
    console.log(signResult);
    var result = await web3.eth.sendSignedTransaction(signResult.rawTransaction);
    console.log(result);

}


