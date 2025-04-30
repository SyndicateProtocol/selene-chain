// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {RLPTxBreakdown} from "./RLP/RLPTxBreakdown.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Angel721} from "./token/Angel721.sol";

contract MoonInteraction {
    Angel721 public angel;

    event WaxingCrescent(string);
    event WaxingGibbous(string);

    constructor(address _angel721Address) {
        angel = Angel721(_angel721Address);
    }

    function waxingCrescent() public returns (string memory) {
        string memory message = "let me play among the stars";
        emit WaxingCrescent(message);
        return message;
    }

    // TODO: @caleb [DELTA-7296]
    // function newMoon() public {}

    // TODO: @caleb [DELTA-7292]
    // UI: address input + number input for donation: (non-angel number donation = failed, angel number donation = succes)
    function firstQuarter(address to) public {
        angel.mint(to);
    }

    function waxingGibbous() public returns (string memory) {
        string memory message = "fly me to the moon";
        emit WaxingGibbous(message);
        return message;
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
