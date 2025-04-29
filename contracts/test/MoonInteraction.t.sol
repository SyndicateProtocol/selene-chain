// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MoonInteraction} from "../src/MoonInteraction.sol";

contract MoonInteractionTest is Test {
    MoonInteraction public moonInteraction;
    address mockAngel721Address = address(0x1);

    function setUp() public {
        moonInteraction = new MoonInteraction(mockAngel721Address);
    }

    function test_WaxingCrescent() public {
        vm.expectEmit(true, true, true, true);
        emit MoonInteraction.WaxingCrescent("let me play among the stars");
        string memory message = moonInteraction.waxingCrescent();
        assertEq(message, "let me play among the stars");
    }

    function test_WaxingGibbous() public {
        vm.expectEmit(true, true, true, true);
        emit MoonInteraction.WaxingGibbous("fly me to the moon");
        string memory message = moonInteraction.waxingGibbous();
        assertEq(message, "fly me to the moon");
    }
}
