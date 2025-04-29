// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {MoonphasePermissionModule} from "../src/MoonphasePermissionModule.sol";

contract MoonphasePermissionModuleScript is Script {
    MoonphasePermissionModule public moonphasePermissionModule;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        moonphasePermissionModule = new MoonphasePermissionModule();

        vm.stopBroadcast();
    }
}
