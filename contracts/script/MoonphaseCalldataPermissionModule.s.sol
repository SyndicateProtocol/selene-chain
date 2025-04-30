// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {MoonphasePermissionModule} from "../src/MoonphasePermissionModule.sol";

contract MoonphasePermissionModuleScript is Script {
    // @note TODO: Replace with actual addresses
    address internal allowedContract = address(0x1);
    address internal owner = address(0x2);

    MoonphasePermissionModule internal moonphasePermissionModule;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        moonphasePermissionModule = new MoonphasePermissionModule(allowedContract, owner);

        vm.stopBroadcast();
    }
}
