const BetaNFTImage = artifacts.require("BetaNFTImage"); 

const BetaNFTImageSeason1 = artifacts.require("BetaNFTImageSeason1"); 
module.exports = async function(deployer,network, accounts) {
    var nftName = "Beta NFT Image"
    var nftSymbol = "BNI"
    var baseURI = "https://ipfs.io/ipfs/QmUkTKJEWB9MPaBAqLxF6jSw6FGyAyhQU9Ji8ykfbanobB/"
    var total = "50"
    await deployer.deploy(BetaNFTImage,nftName,nftSymbol,total);
    const monster = await BetaNFTImage.deployed();

    var tokenName = "Beta NFT Image Season 1"
    var tokenSymbol = "BNIS1"
    await deployer.deploy(BetaNFTImageSeason1,tokenName,tokenSymbol,monster.address);
    const btcContract = await BetaNFTImageSeason1.deployed();
    
    await monster.setBtcs1(btcContract.address);
    await monster.flipSaleState();

};