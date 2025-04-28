// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {RLPTxBreakdown} from "./RLP/RLPTxBreakdown.sol";
import {ICalldataPermissionModule} from "./interfaces/ICalldataPermissionModule.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Angel721} from "./Angel721.sol";

contract MoonInteraction {
    Angel721 public angel;

    constructor(address _angel721Address) {
        angel = Angel721(_angel721Address);
    }

    function mint(address to) public payable {
        angel.mint(to);
    }
}
