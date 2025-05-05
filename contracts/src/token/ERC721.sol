// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {ERC721 as ERC721_} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721 is ERC721_, Ownable {
    string public baseURI;

    constructor(string memory name, string memory symbol, address owner) ERC721_(name, symbol) Ownable(owner) {}

    function setBaseURI(string memory uri) public onlyOwner {
        baseURI = uri;
    }

    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }

    function burn(uint256 tokenId) public {
        _burn(tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}
