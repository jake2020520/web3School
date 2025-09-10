require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require('hardhat-abi-exporter');

let dotenv = require('dotenv')
dotenv.config({ path: "./.env" })

const mnemonic = process.env.MNEMONIC
const ethercankey = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",

  networks: {
    dev: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
      gas: 12000000,
      // accounts: {
      //   mnemonic: mnemonic,
      // },
    },
    mumbai: {
      url: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
      accounts: {
        mnemonic: mnemonic,
      },
      chainId: 80001,
    },
  },

  abiExporter: {
      path: './deployments/abi',
      clear: true,
      flat: true,
      only: ["Bank", "ERC2612"],
      spacing: 2,
      pretty: true,
  },

  etherscan: {
    apiKey: {
      polygonMumbai: ethercankey
    }
  }
};
