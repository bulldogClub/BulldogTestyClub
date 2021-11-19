const { Contract } = require('ethers');
var fs = require('fs');

const contractPath = '../build/contracts/BulldogTestyClubSeason1.json'

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

    await setTimeRange();

    var timeRangeResult = await contract.methods.timeRange().call();
    console.log(timeRangeResult)

}


async function setTimeRange(){
    var data =  fs.readFileSync(contractPath);
    var contractJson = JSON.parse(data);
    var address = contractJson.networks[137].address;
    var abi = contractJson.abi;
    var contract = new web3.eth.Contract(abi, address);
    var timeRange = [1637046000,1639638000]

    var encodeABI = contract.methods.setTimeRange(timeRange).encodeABI();
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


