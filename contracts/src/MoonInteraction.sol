// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {RLPTxBreakdown} from "./RLP/RLPTxBreakdown.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Angel721} from "./token/Angel721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MoonInteraction is Ownable {
    Angel721 public angel;

    event NewMoon(string);
    event WaxingCrescent(string);
    event FirstQuarter(address indexed);
    event WaxingGibbous(string);
    event WaningGibbous(string);
    event LastQuarter(string, address indexed);
    event WaningCrescent(address indexed, uint256 indexed);
    event Withdraw(address indexed, uint256 indexed);
    /// @notice Constructor
    /// @param _angel721Address The address of the Angel721 contract
    /// @param _owner The owner of the contract

    constructor(address _angel721Address, address _owner) Ownable(_owner) {
        angel = Angel721(_angel721Address);
    }

    /// @notice Emits the NewMoon event
    /// @param message The message to emit
    function newMoon(string memory message) public {
        emit NewMoon(message);
    }

    /// @notice Emits the WaxingCrescent event
    /// @return message The message to emit
    function waxingCrescent() public returns (string memory) {
        string memory message = "let me play among the stars";
        emit WaxingCrescent(message);
        return message;
    }

    /// @notice Emits the FirstQuarter event
    /// @param to The address to emit
    function firstQuarter(address to) public payable {
        angel.mint(to, 0);
        emit FirstQuarter(to);
    }

    /// @notice Emits the WaxingGibbous event
    /// @return message The message to emit
    function waxingGibbous() public returns (string memory) {
        string memory message = "fly me to the moon";
        emit WaxingGibbous(message);
        return message;
    }

    /// @notice Emits the WaningGibbous event
    function waningGibbous() public {
        emit WaningGibbous("U+1F316"); // 🌖

        // Consume gas by doing expensive operations
        uint256 n = 250; // Carefully chosen to use ~2M gas
        for (uint256 i = 0; i < n; i++) {
            // Storage writes are expensive (~20k gas each)
            bytes32 slot = keccak256(abi.encodePacked(i));
            assembly {
                sstore(slot, 1)
            }
        }
    }

    /// @notice Emits the LastQuarter event
    /// @param messages The messages to emit
    /// @param recipients The recipients to emit
    function lastQuarter(string[] memory messages, address[] memory recipients) public {
        for (uint256 i = 0; i < messages.length; i++) {
            emit LastQuarter(messages[i], recipients[i]);
        }
    }

    /// @notice Emits the WaningCrescent event
    function waningCrescent() public payable {
        emit WaningCrescent(msg.sender, msg.value);
    }

    /// @notice Withdraws the balance of the contract to the owner
    function withdraw() public {
        address owner = owner();
        uint256 balance = address(this).balance;
        emit Withdraw(owner, balance);
        payable(owner).transfer(balance);
    }
}
