// require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

// TODO: Make this secure
//const url_testnet = 'https://polygon-mumbai.g.alchemy.com/v2/pDlQbrXJCgYR5Dlhe6KiGGZGbC9AN0A0'
//const privateKey = '3787e903f2c70ef9d3f9e6a39160b7ccd191c323e383e366a99be4734878a59a'

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: url_mainnet,
      // accounts: [process.env.PRIVATE_KEY]
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
