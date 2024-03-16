require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { INFURA_API_KEY, MNEMONIC } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      mining: {
        auto: true,
        interval: 5000,
      },
    },
    ganache: {
      url: "http://127.0.0.1:7545",
      network_id: "5777", // Your network id
    },
    sepolia: {
      url: INFURA_API_KEY,
      accounts: {
        mnemonic: MNEMONIC,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: "",
      },
    },
  },
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};
