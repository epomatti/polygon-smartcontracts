require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();
const { NFTStorage, File } = require('nft.storage');
const fs = require('fs');

task("deploy", "Deploy a token")
  .addParam("contractName", "The contract name to generate the factory")
  .setAction(async (taskArgs) => {
    const Transactions = await hre.ethers.getContractFactory(taskArgs.contractName);
    const transactions = await Transactions.deploy();
    await transactions.deployed();
    console.log("Deployed to:", transactions.address);
  });

task("create-metadata", "Create the kitty NFT metadata")
  .setAction(async () => {
    const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });
    const metadata = await client.store({
      name: 'Kitty',
      description: "A very cute kitty",
      image: new File(
        [await fs.promises.readFile('assets/kitty.png')],
        'image.png',
        { type: 'image/png' }
      ),
      attributes: [
        {
          "trait_type": "Cuteness",
          "value": "Very cute"
        }
      ]
    })
    console.log("Metadata stored NFT.Storage URL:", metadata.url)
  });

task("mint", "Mint an NFT")
  .addParam("contractName", "The contract name to generate the factory")
  .addParam("contractAddress", "The account's address")
  .addParam("metadataUrl", "The IPFS metadata URL")
  .setAction(async (taskArgs) => {
    const { contractName, contractAddress, metadataUrl } = taskArgs;
    const contract = await ethers.getContractFactory(contractName)
    const [owner] = await ethers.getSigners()
    await contract.attach(contractAddress).mintNFT(owner.address, metadataUrl)
    console.log("NFT minted to: ", owner.address)
  });

task("update-metadata-url", "Update an NFT token with a new metadata URL")
  .addParam("contractName", "The contract name to generate the factory")
  .addParam("contractAddress", "The account's address")
  .addParam("metadataUrl", "The IPFS metadata URL")
  .addParam("tokenId", "The NFT token ID")
  .setAction(async (taskArgs) => {
    const { contractName, contractAddress, metadataUrl, tokenId } = taskArgs;
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.attach(contractAddress);
    await contract.setTokenURI(tokenId, metadataUrl);
    console.log(`Updated Token URI: ${tokenId}`);
  });

task("transfer", "Transfer an NFT")
  .addParam("contractName", "The contract name to generate the factory")
  .addParam("contractAddress", "The account's address")
  .addParam("fromAddr", "Origin contract")
  .addParam("toAddr", "Destination contract")
  .addParam("tokenId", "The NFT token id to be transferred")
  .setAction(async (taskArgs) => {
    const { contractName, contractAddress, fromAddr, toAddr, tokenId } = taskArgs;
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.attach(contractAddress);
    await contract['safeTransferFrom(address,address,uint256)'](fromAddr, toAddr, tokenId);
    console.log("Transferred");
  });

task("burn", "Burn a token")
  .addParam("contractAddress", "The account's address")
  .addParam("tokenId", "The NFT token id")
  .addParam("contractName", "The contract name to generate the factory")
  .setAction(async (taskArgs) => {
    const { contractName, contractAddress, tokenId } = taskArgs;
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.attach(contractAddress);
    await contract.burn(tokenId);
    console.log(`Burned token id: ${tokenId}`);
  });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: "0.8.9",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
