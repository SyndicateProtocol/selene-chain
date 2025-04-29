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

    function waxingCrescent() public pure returns (string memory) {
        return "let me play among the stars";
    }

    // TODO: @caleb [DELTA-7296]
    // function newMoon() public {}

    // TODO: @caleb [DELTA-7292]
    function firstQuarter(address to) public {
        angel.mint(to);
    }

    function waxingGibbous() public pure returns (string memory) {
        return "fly me to the moon";
    }

    // TODO: @caleb [DELTA-7293]
    // function fullMoon() public {}

    // TODO: @caleb [DELTA-7298]
    // function fullMoon() public {}

    // TODO: @caleb [DELTA-7298]
    // function waningGibbous() public {}

    // TODO: @caleb [DELTA-7294]
    // function lastQuarter() public {}

    // TODO: @caleb [DELTA-7295]
    // function waningCrescent() public {}
}
