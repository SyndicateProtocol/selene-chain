// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {ERC1155 as ERC1155_} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ERC1155 is ERC1155_, Ownable {
    string public baseURI;

    constructor(string memory uri, address owner) ERC1155_(uri) Ownable(owner) {
        baseURI = uri;
    }

    function setURI(string memory uri) public onlyOwner {
        _setURI(uri);
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data) public {
        _mint(to, id, amount, data);
    }

    function burn(uint256 id, uint256 amount) public {
        _burn(msg.sender, id, amount);
    }
}
