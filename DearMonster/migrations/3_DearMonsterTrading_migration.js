// var SimpleStorage = artifacts.require("./SimpleStorage.sol");

// module.exports = function(deployer) {
//   deployer.deploy(SimpleStorage);
// };

//var DMSToken = artifacts.require("DMS.sol");
var dmsToken = artifacts.require("DMSToken.sol");
var DearMonster = artifacts.require("DearMonster.sol");
const DearMonsterTrading = artifacts.require("DearMonsterTrading.sol");
const { toWei } = web3.utils;

module.exports = async function (deployer, network, accounts) {
    try {
        // let DMSTokenAddress;
        // if (network == 'develop' || network == 'bscTestnet' || network == 'ganache_local') {
        //     await deployer.deploy(DMSToken);
        //     DMSTokenAddress = DMSToken.address;
        // } if (network == 'mainnet')
        //     DMSTokenAddress = '0x9bfd1348cf574e3eb2b114cc18374b09ad012c69';
        const dmsTokenInstance = await dmsToken.deployed();
        let _monsterImageURI = "/assets/gif/Dragon (1)/1. Dragon animated.gif";
        await deployer.deploy(DearMonster, _monsterImageURI, _monsterImageURI, dmsTokenInstance.address);
        
        //await deployer.deploy(DearMonsterTrading, DearMonster.address, dmsTokenInstance, accounts[0]);
        
        //await dmsTokenInstance.transfer(DearMonster.address, toWei('300000000000000000', 'gwei'));
        //const currentDMSBalance = await dearMonsterInstance.balanceOf(DearMonsterTrading.address);
        //console.log(currentDMSBalance);
    } catch (error) {
        console.log(error);
    }
};

// var dmsToken = artifacts.require("DMSToken.sol");
// var BUSDToken = artifacts.require("BUSDToken.sol");
// const PublicSale = artifacts.require("PublicSale.sol");
// const { toWei } = web3.utils;

// module.exports = async function (deployer, network) {
//     try {
//         let BUSDTokenAddress;
//         if (network == 'develop' || network == 'bscTestnet' || network == 'ganache_local') {
//             await deployer.deploy(BUSDToken);
//             BUSDTokenAddress = BUSDToken.address;
//         } if (network == 'mainnet')
//             BUSDTokenAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
//         const dmsTokenInstance = await dmsToken.deployed();
//         const startOfICO = Math.floor(Date.UTC(2021, 9, 17, 13, 25, 0) / 1000);
//         const endOfICO = Math.floor(Date.UTC(2021, 11, 22, 13, 40, 0) / 1000);
//         const publishDate = Math.floor(Date.UTC(2021, 11, 23, 13, 45, 0) / 1000);
//         await deployer.deploy(PublicSale, dmsTokenInstance.address, BUSDTokenAddress, startOfICO, endOfICO, publishDate);
//         await dmsTokenInstance.transfer(PublicSale.address, toWei('300000000000000000', 'gwei'));
//         const currentDMSBalance = await dmsTokenInstance.balanceOf(PublicSale.address);
//         console.log(currentDMSBalance);
//     } catch (error) {
//         console.log(error);
//     }
// };