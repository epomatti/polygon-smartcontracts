# Polygon Smart Contracts <img src=".docs/polygon.png" width=20 />

ERC20 and ERC721 code using Hardhat tasks. Operations:

- Deploy contracts
- Upload IPFS NFT metadata
- Mint tokens
- Update metadata
- Transfer NFT tokens
- Burn NFT tokens (even without ownership)

<img src="assets/kitty.png" width=200/>

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

1. Add the Polygon account private key.
2. Create and add the [NFT.Storage](https://nft.storage/) API Key.

## Usage

Operations implemented with Hardhat tasks in the the `hardhat.config.js`.

```sh
# deploy the nft contract
npx hardhat deploy --contract-name MyNFT

# upload the metadata to IPFS
npx hardhat create-metadata

# mint an nft token
npx hardhat mint \
  --contract-name MyNFT \
  --contract-address '0x123456789' \
  --metadata-url 'ipfs://abcdef/metadata.json'

# update an nft token with a new metadata url
npx hardhat update-metadata-url \
  --contract-name MyNFT \
  --contract-address '0x123456789' \
  --metadata-url 'ipfs://abcdef/metadata.json' \
  --token-id 0

# transfer the token
npx hardhat transfer \
  --contract-name MyNFT \
  --contract-address '0x123456789' \
  --fromAddr '0x123456789' \
  --toAddr '0x123456789' \
  --token-id 0
```

Special code in the contract to allow the burn of the NFT even after transferring it:

```sh
npx hardhat burn \
  --contract-address '0x123456789' \
  --contract-name 'MyNFT' \
  --token-id 0
```
