// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {MoonphasePermissionModule} from "../src/MoonphasePermissionModule.sol";

contract MoonphasePermissionModuleScript is Script {
    MoonphasePermissionModule public moonphasePermissionModule;
    // @note TODO: Replace with actual address
    address public allowedContract = 0x1234567890123456789012345678901234567890;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        moonphasePermissionModule = new MoonphasePermissionModule(allowedContract);

        vm.stopBroadcast();
    }
}
