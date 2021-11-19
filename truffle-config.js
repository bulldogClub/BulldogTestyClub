/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */
const fs = require('fs');

const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = fs.readFileSync(".infuraKey").toString().trim();
const alchemyKey = fs.readFileSync(".alchemyKey").toString().trim();
const mnemonic = fs.readFileSync(".mnemonic").toString().trim();
const ethApiKey =  fs.readFileSync(".ethApiKey").toString().trim();
const polygonApiKey =  fs.readFileSync(".polygonApiKey").toString().trim();

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8546,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      // provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/` + infuraKey),
      // network_id: 4,
    },
    develop: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/` + infuraKey),
      network_id: 3,       
      gas: 5500000,        
      confirmations: 2,    
      timeoutBlocks: 20000, 
      skipDryRun: true,     
      port: 8545
    },

    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/` + infuraKey),
      network_id: 4,
      gas: 5500000,        
      confirmations: 2,    
      timeoutBlocks: 20000, 
      skipDryRun: true,    
    },
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/` + infuraKey),
      network_id: 42,
    },
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/` + infuraKey),
      network_id: 1,
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, `https://polygon-mumbai.g.alchemy.com/v2/`+alchemyKey),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    polygon: {
                                                      
      provider: () => new HDWalletProvider(mnemonic, `https://polygon-mainnet.g.alchemy.com/v2/`+alchemyKey),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 50000,
      skipDryRun: true,
      networkCheckTimeout: 1000000000
    }
  },

  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: { excludeContracts: ['Migrations'] }
  },
  plugins: ['truffle-contract-size', 'truffle-plugin-verify'],

  api_keys: {
    etherscan: polygonApiKey, // eth
  },
  compilers: {
    solc: {
      version: '0.6.10',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  }

}
