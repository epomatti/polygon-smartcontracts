// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address private dao;

    constructor() ERC721("My NFT", "MYNFT") {
        dao = msg.sender;
    }

    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function burn(uint256 _tokenId) public payable {
        require(msg.sender == dao);
        _burn(_tokenId);
    }

    function getDaoAddress() public view returns (address) {
        return dao;
    }

    function setTokenURI(uint256 _tokenId, string memory tokenURI)
        public
        payable
    {
        require(msg.sender == dao);
        _setTokenURI(_tokenId, tokenURI);
    }
}
