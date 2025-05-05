// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {ERC20 as ERC20_} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20 is ERC20_ {
    constructor(string memory name, string memory symbol) ERC20_(name, symbol) {}

    function mint(address account, uint256 value) public {
        _mint(account, value);
    }

    function burn(uint256 value) public {
        _burn(msg.sender, value);
    }
}
