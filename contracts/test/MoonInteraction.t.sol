// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MoonInteraction} from "../src/MoonInteraction.sol";
import {Angel721} from "../src/token/Angel721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MoonInteractionTest is Test {
    MoonInteraction public moonInteraction;
    Angel721 public angel;

    function setUp() public {
        angel = new Angel721("https://api.angel.com/", address(this));
        moonInteraction = new MoonInteraction(address(angel), address(this));
    }

    function test_NewMoon() public {
        vm.expectEmit(true, true, true, true);
        emit MoonInteraction.NewMoon("new moon");
        moonInteraction.newMoon("new moon");
    }

    function test_WaxingCrescent() public {
        vm.expectEmit(true, true, true, true);
        emit MoonInteraction.WaxingCrescent("let me play among the stars");
        string memory message = moonInteraction.waxingCrescent();
        assertEq(message, "let me play among the stars");
    }

    function test_FirstQuarter() public {
        vm.expectEmit(true, true, true, true);
        address to = 0x2F5Eb112a1611d889220BCB2Bbbda761D9bbc4f4;
        emit MoonInteraction.FirstQuarter(to);
        moonInteraction.firstQuarter(to);
    }

    function test_WaxingGibbous() public {
        vm.expectEmit(true, true, true, true);
        emit MoonInteraction.WaxingGibbous("fly me to the moon");
        string memory message = moonInteraction.waxingGibbous();
        assertEq(message, "fly me to the moon");
    }

    function test_LastQuarter() public {
        uint256 gasStart = gasleft();
        vm.expectEmit(true, true, true, true);
        emit MoonInteraction.LastQuarter("hello", 0x2F5Eb112a1611d889220BCB2Bbbda761D9bbc4f4);
        address[] memory recipients = new address[](1);
        recipients[0] = 0x2F5Eb112a1611d889220BCB2Bbbda761D9bbc4f4;
        string[] memory messages = new string[](1);
        messages[0] = "hello";
        moonInteraction.lastQuarter(messages, recipients);
        uint256 gasUsed = gasStart - gasleft();
        console.log("gasUsed", gasUsed);
    }

    function test_WaningGibbous() public {
        uint256 gasStart = gasleft();
        vm.expectEmit(true, true, true, true);
        emit MoonInteraction.WaningGibbous("U+1F316");
        moonInteraction.waningGibbous();
        uint256 gasUsed = gasStart - gasleft();
        assertGt(gasUsed, 2_000_000); // Should use over 2M gas
    }

    function test_Withdraw() public {
        vm.deal(address(moonInteraction), 100 ether);
        address owner = address(this);
        uint256 balance = address(moonInteraction).balance;

        vm.expectEmit(true, true, true, true);
        emit MoonInteraction.Withdraw(owner, balance);
        moonInteraction.withdraw();
    }

    receive() external payable {}
}
