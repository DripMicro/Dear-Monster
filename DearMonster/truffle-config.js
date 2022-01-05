const path = require("path");
require("dotenv").config({path: "./.env"});

const HDWalletProvider = require('@truffle/hdwallet-provider');
const bscTest = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const MNEMONIC = 'YOUR WALLET KEY';
const AccountIndex = 0;

// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
      host: "127.0.0.1",
      network_id: 1337
    },
    development:{
      port:7545,
      host: "127.0.0.1",
      network_id: 5777 
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", AccountIndex)
      },
      network_id: 5777
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/YOUR_API_KEY")
      },
    },
    bscTestnet: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, bscTest),
      network_id: 97,   // This network is yours, in the cloud. 
      production: true,    // Treats this network as if it was a public net. (default: false)
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
          details: {
            yul: false
          }
        },
        //  evmVersion: "byzantium"
      } 
    }
  },  
};
