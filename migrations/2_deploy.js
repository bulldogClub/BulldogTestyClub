const BulldogTestyClub = artifacts.require("BulldogTestyClub"); 

const BulldogTestyClubSeason1 = artifacts.require("BulldogTestyClubSeason1"); 
module.exports = async function(deployer,network, accounts) {
    var nftName = "Bulldog Testy Club"
    var nftSymbol = "BTC"
    var total = "1000"
    await deployer.deploy(BulldogTestyClub,nftName,nftSymbol,total);
    const monster = await BulldogTestyClub.deployed();

    var tokenName = "Bulldog Testy Club Season 1"
    var tokenSymbol = "BTCS1"
    await deployer.deploy(BulldogTestyClubSeason1,tokenName,tokenSymbol,monster.address);
    const btcContract = await BulldogTestyClubSeason1.deployed();
    
    await monster.setBtcs1(btcContract.address);
    await monster.flipSaleState();

};