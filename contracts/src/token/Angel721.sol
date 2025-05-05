// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {RLPTxBreakdown} from "../RLP/RLPTxBreakdown.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Angel721 is ERC721, Ownable {
    string public baseURI;

    constructor(string memory uri, address _owner) ERC721("ANGEL", "ANGEL") Ownable(_owner) {
        baseURI = uri;
    }

    function mint(address to, uint256 tokenId) public payable {
        _mint(to, tokenId);
    }

    function _baseURI() internal view virtual override onlyOwner returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory uri) public onlyOwner {
        baseURI = uri;
    }
}
