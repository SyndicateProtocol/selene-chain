// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MoonInteraction} from "../src/MoonInteraction.sol";

contract MoonInteractionTest is Test {
    MoonInteraction public moonInteraction;

    function setUp() public {
        // Initialize MoonInteraction
        moonInteraction = new MoonInteraction();
    }

    function test_WaxingCrescent() public view {
        assertEq(moonInteraction.waxingCrescent(), "let me play among the stars");
    }

    function test_FirstQuarter() public view {
        assertEq(moonInteraction.firstQuarter(), "in other words, hold my hand");
    }

    function test_WaxingGibbous() public view {
        assertEq(moonInteraction.waxingGibbous(), "fly me to the moon");
    }
}
