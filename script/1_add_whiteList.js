var fs = require('fs');

const contractPath = '../build/contracts/BetaNFTImageSeason1.json'
const whiteListPath = './whiteList.txt'
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
    let lines;
    try {
        const data = fs.readFileSync(whiteListPath, 'UTF-8');
        lines = data.split(/\r?\n/);
    } catch (err) {
        console.error(err);
    }

    lines.forEach((line) => console.log(line));

    await addWhiteList(lines);
}


async function addWhiteList(whiteList){
    var data =  fs.readFileSync(contractPath);
    var contractJson = JSON.parse(data);
    var address = contractJson.networks[137].address;
    var abi = contractJson.abi;
    var contract = new web3.eth.Contract(abi, address);
    var encodeABI = contract.methods.addWhitelistMember(whiteList).encodeABI();
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


