const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = "curtain broccoli curious empty unfair hazard leg fork oblige then much danger"
const path = require('path');
module.exports = {
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  networks: {
    ropsten: {
      provider: () => new HDWalletProvider(
        mnemonic,
        "wss://ropsten.infura.io/ws/v3/e15a31b0af844852bc2c1c99decad770"
      ),
      network_id: 3,
      skipDryRun: true,
    },
    local: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "1337",
      skipDryRun: true,
    }
  },
  mocha: {
  },
  compilers: {
    solc: {
      version: "0.8.12",
    }
  },
};