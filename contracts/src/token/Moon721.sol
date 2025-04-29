// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Moon721 is ERC721 {
    constructor() ERC721("Moon721", "MOON721") {}

    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }
}
