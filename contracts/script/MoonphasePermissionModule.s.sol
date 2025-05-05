// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {MoonphasePermissionModule} from "../src/MoonphasePermissionModule.sol";
import {MoonInteraction} from "../src/MoonInteraction.sol";
import {Angel721} from "../src/token/Angel721.sol";

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract MoonphasePermissionModuleScript is Script {
    MoonphasePermissionModule internal moonphasePermissionModule;
    Angel721 internal angel;

    address internal allowedContract;

    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        address owner = vm.addr(privateKey);

        vm.startBroadcast(privateKey);
        angel = new Angel721("https://metadata.syndicate.io/63888/0x0000000000000000000000000000000000000000/", owner);
        console.log("Angel721:", address(angel));
        string memory base = "https://metadata.syndicate.io/63888/";
        string memory hexAddress = Strings.toHexString(address(angel)); // includes '0x' prefix
        string memory fullURI = string(abi.encodePacked(base, hexAddress, "/"));
        console.log("fullURI", fullURI);
        angel.setBaseURI(fullURI);
        allowedContract = address(new MoonInteraction(address(angel), owner));
        console.log("MoonInteraction:", allowedContract);
        moonphasePermissionModule = new MoonphasePermissionModule(allowedContract, owner);
        console.log("MoonphasePermissionModule:", address(moonphasePermissionModule));

        vm.stopBroadcast();
    }
}
