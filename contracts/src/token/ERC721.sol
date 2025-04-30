// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Moon721 is ERC721, Ownable {
    string public baseURI;

    constructor(string memory name, string memory symbol, address owner) ERC721(name, symbol) Ownable(owner) {}

    function setBaseURI(string memory uri) public onlyOwner {
        baseURI = uri;
    }

    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}
