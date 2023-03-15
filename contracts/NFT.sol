// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage{
    uint256 tokenID;

    constructor() ERC721("MyNFT", "NFT") {}


    function safeMint(string memory uri) public returns(uint256){
        tokenID ++;
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, uri);
        // approve(makarketplace,tokenID);
        return tokenID;
          
    }

    
}
