// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {MoonphasePermissionModule} from "../src/MoonphasePermissionModule.sol";
import {MoonInteraction} from "../src/MoonInteraction.sol";
import {Angel721} from "../src/token/Angel721.sol";

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {ERC20} from "../src/token/ERC20.sol";
import {ERC721} from "../src/token/ERC721.sol";
import {ERC1155} from "../src/token/ERC1155.sol";

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

contract DeployMoonphasePermissionModule is Script {
    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        MoonphasePermissionModule moonphasePermissionModule = new MoonphasePermissionModule(
            address(0x268e0A6c79107f74Cf5Ef3067C110952e9127843), address(0x9334297A9c1B3c5cf96f8821385a629aC64AF154)
        );
        console.log("MoonphasePermissionModule:", address(moonphasePermissionModule));
        vm.stopBroadcast();
    }
}

contract DeployERC20 is Script {
    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        ERC20 erc20 = new ERC20("MENE", "MENE");
        console.log("ERC20:", address(erc20));
        vm.stopBroadcast();
    }
}

contract DeployERC721 is Script {
    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        ERC721 erc721 = new ERC721("ARTEMIS", "ARTEMIS", address(0x9334297A9c1B3c5cf96f8821385a629aC64AF154));
        console.log("ERC721:", address(erc721));
        vm.stopBroadcast();
    }
}

contract DeployERC1155 is Script {
    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        ERC1155 erc1155 = new ERC1155("HECATE", address(0x9334297A9c1B3c5cf96f8821385a629aC64AF154));
        console.log("ERC1155:", address(erc1155));
        vm.stopBroadcast();
    }
}
