// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Moon20 is ERC20 {
    constructor() ERC20("Moon20", "MOON20") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
