// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {MoonphaseCalldataPermissionModule} from "../src/MoonphaseCalldataPermissionModule.sol";

contract MoonphaseCalldataPermissionModuleScript is Script {
    MoonphaseCalldataPermissionModule public moonphaseCalldataPermissionModule;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        moonphaseCalldataPermissionModule = new MoonphaseCalldataPermissionModule();

        vm.stopBroadcast();
    }
}
