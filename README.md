# Basic Sample Hardhat Project

## Setup

Install the project dependencies and compile the contracts:

```sh
yarn install

npx hardhat compile
```

Setup the `.env` configuration:

```sh
cp .env.sample .env
```

Add the Polygon private key.

Create and add the [NFT.Storage](https://nft.storage/) API Key.

## Tasks

### ERC721 (NFT)


```sh
# deploy the nft contract
npx hardhat deploy --contract-name MyNFT

# upload the metadata to IPFS
npx hardhat create-metadata

# mint an nft token
npx hardhat mint \
  --contract-name MyNFT \
  --contract-address '0x_CONTRACT_ADDRESS' \
  --metadata-url 'ipfs://....../metadata.json'

# burn the token using privileged permissions in the contract
npx hardhat burn \
  --contract-address '0x_CONTRACT_ADDRESS' \
  --contract-name 'MyNFT' \
  --token-id 0
```
