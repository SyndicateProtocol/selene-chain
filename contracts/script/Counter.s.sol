// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Moonphase} from "../src/Moonphase.sol";

contract MoonphaseScript is Script {
    Moonphase public moonphase;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        moonphase = new Moonphase();

        vm.stopBroadcast();
    }
}
