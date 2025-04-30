// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {RLPTxBreakdown} from "./RLP/RLPTxBreakdown.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Angel721} from "./token/Angel721.sol";
import {console} from "forge-std/console.sol";

contract MoonInteraction {
    Angel721 public angel;

    event NewMoon(string);
    event WaxingCrescent(string);
    event FirstQuarter(address indexed);
    event WaxingGibbous(string);
    event FullMoon(address indexed);
    event WaningGibbous(string);
    event LastQuarter(string, address indexed);
    event WaningCrescent(address indexed, uint256 indexed);

    constructor(address _angel721Address) {
        angel = Angel721(_angel721Address);
    }

    function newMoon(string memory message) public {
        emit NewMoon(message);
    }

    function waxingCrescent() public returns (string memory) {
        string memory message = "let me play among the stars";
        emit WaxingCrescent(message);
        return message;
    }

    function firstQuarter(address to) public {
        angel.mint(to, 0);
        emit FirstQuarter(to);
    }

    function waxingGibbous() public returns (string memory) {
        string memory message = "fly me to the moon";
        emit WaxingGibbous(message);
        return message;
    }

    function waningGibbous() public {
        emit WaningGibbous("U+1F316"); // 🌖

        // Consume gas by doing expensive operations
        uint256 n = 100; // Carefully chosen to use ~2M gas
        for (uint256 i = 0; i < n; i++) {
            // Storage writes are expensive (~20k gas each)
            bytes32 slot = keccak256(abi.encodePacked(i));
            assembly {
                sstore(slot, 1)
            }
        }
    }

    function lastQuarter(string[] memory messages, address[] memory recipients) public {
        for (uint256 i = 0; i < messages.length; i++) {
            emit LastQuarter(messages[i], recipients[i]);
        }
    }

    function waningCrescent() public payable {
        emit WaningCrescent(msg.sender, msg.value);
    }
}
