// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {RLPTxBreakdown} from "./RLP/RLPTxBreakdown.sol";
import {ICalldataPermissionModule} from "./interfaces/ICalldataPermissionModule.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Angel721} from "./Angel721.sol";
import {MoonphaseCalldataPermissionModule} from "./MoonphaseCalldataPermissionModule.sol";

contract MoonInteraction {
    Angel721 public angel;
    MoonphaseCalldataPermissionModule public moonPhaseModule;
    bytes4 private constant FLY_ME_TO_THE_MOON_SELECTOR =
        bytes4(keccak256("flyMeToTheMoon()"));

    constructor(address _angel721Address, address _moonPhaseModule) {
        angel = Angel721(_angel721Address);
        moonPhaseModule = MoonphaseCalldataPermissionModule(_moonPhaseModule);
    }

    // TODO: @caleb [DELTA-7296]
    // function newMoon() public {}

    // TODO: @kris10 [DELTA-7291]
    // function waxingCrescent() public {}

    // TODO: @caleb [DELTA-7292]
    function firstQuarter(address to) public {
        angel.mint(to);
    }

    function flyMeToTheMoon() public pure returns (string memory) {
        return "fly me to the moon";
    }

    // TODO: @kris10 [DELTA-7297]
    function waxingGibbous() public onlyAllowedDuringPhase {}

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

    modifier onlyAllowedDuringPhase() {
        if (isWaxingGibbous()) {
            require(
                msg.sig == FLY_ME_TO_THE_MOON_SELECTOR,
                "Only flyMeToTheMoon during Waxing Gibbous"
            );
        }
        _;
    }

    fallback() external {
        if (isWaxingGibbous()) {
            require(
                msg.sig == FLY_ME_TO_THE_MOON_SELECTOR,
                "Only flyMeToTheMoon during Waxing Gibbous"
            );
        }
        revert("Function not found");
    }
}
