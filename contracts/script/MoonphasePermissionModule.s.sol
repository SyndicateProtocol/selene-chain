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

// Deployed to: 0x9cecA064CaB740E5F511b426c7dBD7820795fe13
contract DeployAngel721 is Script {
    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        address owner = vm.addr(privateKey);
        vm.startBroadcast(privateKey);
        Angel721 angel =
            new Angel721("https://metadata.syndicate.io/63888/0x0000000000000000000000000000000000000000/", owner);
        console.log("Angel721:", address(angel));
        vm.stopBroadcast();
    }
}

contract UpdateAngel721BaseURI is Script {
    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        Angel721 angel = Angel721(0x9cecA064CaB740E5F511b426c7dBD7820795fe13);
        string memory base = "https://metadata.syndicate.io/63888/";
        string memory hexAddress = Strings.toHexString(address(angel)); // includes '0x' prefix
        string memory fullURI = string(abi.encodePacked(base, hexAddress, "/"));
        console.log("fullURI", fullURI);
        angel.setBaseURI(fullURI);
        vm.stopBroadcast();
    }
}

// Deployed to: 0x268e0A6c79107f74Cf5Ef3067C110952e9127843
contract DeployMoonInteraction is Script {
    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        address owner = vm.addr(privateKey);
        vm.startBroadcast(privateKey);
        MoonInteraction moonInteraction =
            new MoonInteraction(address(0x9cecA064CaB740E5F511b426c7dBD7820795fe13), owner);
        console.log("MoonInteraction:", address(moonInteraction));
        vm.stopBroadcast();
    }
}

// Deployed to: 0xc75954B9B4Bb4B80883Cf645744612138b7e4870
contract DeployMoonphasePermissionModule is Script {
    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        address owner = vm.addr(privateKey);
        vm.startBroadcast(privateKey);
        MoonphasePermissionModule moonphasePermissionModule =
            new MoonphasePermissionModule(address(0x268e0A6c79107f74Cf5Ef3067C110952e9127843), owner);
        console.log("MoonphasePermissionModule:", address(moonphasePermissionModule));
        vm.stopBroadcast();
    }
}
