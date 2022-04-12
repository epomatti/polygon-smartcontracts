# Basic Sample Hardhat Project

## Setup

```sh
yarn install
```

Compile the 

```sh
npx hardhat compile
```

```sh
cp .env.sample .env
```

Add the Polygon private key.

Create and add the [NFT.Storage](https://nft.storage/) API Key.


## Tasks

### ERC721 (NFT)

Deploy the contract?

```
npx hardhat deploy --contract-name MyNFT
```

Create the NFT metadata:

```
npx hardhat create-metadata
```

Mint the NFT

```sh
npx hardhat mint \
  --contract-name MyNFT \
  --contract-address '0x_CONTRACT_ADDRESS' \
  --metadata-url 'ipfs://....../metadata.json'
```

Through special permissions the NFT creator can always burn this NFT:

```sh
npx hardhat burn \
  --contract-address '0x_CONTRACT_ADDRESS' \
  --contract-name 'MyNFT' \
  --token-id 0
```

https://nft.storage/


This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
