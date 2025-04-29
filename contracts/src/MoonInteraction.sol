// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {RLPTxBreakdown} from "./RLP/RLPTxBreakdown.sol";
import {ICalldataPermissionModule} from "./interfaces/ICalldataPermissionModule.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Angel721} from "./Angel721.sol";
import {MoonphaseCalldataPermissionModule} from "./MoonphaseCalldataPermissionModule.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MoonInteraction is Ownable {
    Angel721 public angel;
    MoonphaseCalldataPermissionModule public moonPhaseModule;
    bytes4 private constant WAXING_GIBBOUS_SELECTOR =
        bytes4(keccak256("waxingGibbous()"));

    // The only contract allowed to interact during Waxing Crescent phase
    address public allowedContract;

    constructor(
        address _angel721Address,
        address _moonPhaseModule
    ) Ownable(msg.sender) {
        angel = Angel721(_angel721Address);
        moonPhaseModule = MoonphaseCalldataPermissionModule(_moonPhaseModule);
    }

    // TODO: @caleb [DELTA-7296]
    // function newMoon() public {}

    function setAllowedContract(address _allowedContract) public onlyOwner {
        allowedContract = _allowedContract;
    }

    function waxingCrescent() public view returns (string memory) {
        if (isWaxingCrescent()) {
            require(
                msg.sender == allowedContract,
                "Only allowed contract can call"
            );
        }
        return "Let me play among the stars";
    }

    // TODO: @caleb [DELTA-7292]
    function firstQuarter(address to) public onlyAllowedDuringPhase {
        angel.mint(to);
    }

    function waxingGibbous() public pure returns (string memory) {
        return "fly me to the moon";
    }

    // TODO: @caleb [DELTA-7293]
    // function fullMoon() public {}

    // TODO: @caleb [DELTA-7298]
    // function fullMoon() public {}

    // TODO: @caleb [DELTA-7298]
    // function waningGibbous() public {}

    // TODO: @caleb [DELTA-7294]
    // function lastQuarter() public {}

    // TODO: @caleb [DELTA-7295]
    // function waningCrescent() public {}

    function isWaxingGibbous() internal view returns (bool) {
        string memory phase = moonPhaseModule.currentPhase();
        return
            keccak256(abi.encodePacked(phase)) ==
            keccak256(abi.encodePacked("Waxing Gibbous"));
    }

    function isWaxingCrescent() internal view returns (bool) {
        string memory phase = moonPhaseModule.currentPhase();
        return
            keccak256(abi.encodePacked(phase)) ==
            keccak256(abi.encodePacked("Waxing Crescent"));
    }

    modifier onlyAllowedDuringPhase() {
        if (isWaxingGibbous()) {
            require(
                msg.sig == WAXING_GIBBOUS_SELECTOR,
                "Only waxingGibbous can be called during Waxing Gibbous"
            );
        } else if (isWaxingCrescent()) {
            require(
                msg.sender == allowedContract,
                "Only allowed contract can call during Waxing Crescent"
            );
        }
        _;
    }

    fallback() external {
        if (isWaxingGibbous()) {
            require(
                msg.sig == WAXING_GIBBOUS_SELECTOR,
                "Only waxingGibbous can be called during Waxing Gibbous"
            );
        } else if (isWaxingCrescent()) {
            require(
                msg.sender == allowedContract,
                "Only allowed contract can call during Waxing Crescent"
            );
        }
        revert("Function not found");
    }
}
