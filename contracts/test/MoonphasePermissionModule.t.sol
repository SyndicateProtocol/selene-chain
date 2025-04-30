// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MoonphasePermissionModule} from "../src/MoonphasePermissionModule.sol";

contract MoonphasePermisionModuleTest is Test {
    MoonphasePermissionModule public moonphase;

    function setUp() public {
        moonphase = new MoonphasePermissionModule();
    }

    function test_NewMoon() public {
        uint256 timestamp = 1748322000;
        assertMoonPhase(timestamp, "New Moon");
        vm.warp(timestamp);
        bytes memory tooLongData =
            hex"02f901cf0180843b9aca008504a817c8008094123456789012345678901234567890123456789080b90164dd02ceff00000000000000000000000012345678901234567890123456789012345678900000000000000000000000001234567890123456789012345678901234567890000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000001200000000000000000000000001234567890123456789012345678901234567890000000000000000000000000123456789012345678901234567890123456789000000000000000000000000000000000000000000000000000000000000000141234567890123456789012345678901234567890000000000000000000000000c080a04b6205ed1d128b2e9d18fb875841f96663fafaf4d40a17022a5c1d2e6371ceb5a05c99870b3cc90e0891f74e1da7c4dfdc3208649c762e32fd1ab1c6631073ade7";
        assertEq(moonphase.isAllowed(address(this), address(this), tooLongData), false);

        bytes memory shortData =
            hex"02f88d0180843b9aca008504a817c8008094123456789012345678901234567890123456789080a4e25fd8a70000000000000000000000001234567890123456789012345678901234567890c080a0b66504133b07a8c904a65422d0ccfe2d7f9c5a0c781b88ee5160b9c8a83898f9a07e68107449eae35b7ee4fca01e731380b746bb733e4cc4e5311aaf3fe92c4c3c";
        assertEq(moonphase.isAllowed(address(this), address(this), shortData), true);
    }

    // function test_WaxingCrescent() public {
    //     uint256 timestamp = 1748322000;
    //     assertMoonPhase(timestamp, "Waxing Crescent");
    //     vm.warp(timestamp);
    // }

    // function test_FirstQuarter() public {
    //     uint256 timestamp = 1748322000;
    //     assertMoonPhase(timestamp, "First Quarter");
    //     vm.warp(timestamp);
    // }

    // function test_WaxingGibbous() public {
    //     uint256 timestamp = 1748322000;
    //     assertMoonPhase(timestamp, "Waxing Gibbous");
    //     vm.warp(timestamp);
    // }

    // function test_FullMoon() public {
    //     uint256 timestamp = 1748322000;
    //     assertMoonPhase(timestamp, "Full Moon");
    //     vm.warp(timestamp);
    // }

    // function test_WaningGibbous() public {
    //     uint256 timestamp = 1748322000;
    //     assertMoonPhase(timestamp, "Waning Gibbous");
    //     vm.warp(timestamp);
    // }

    // function test_LastQuarter() public {
    //     uint256 timestamp = 1748322000;
    //     assertMoonPhase(timestamp, "Last Quarter");
    //     vm.warp(timestamp);
    // }

    // function test_WaningCrescent() public {
    //     uint256 timestamp = 1748322000;
    //     assertMoonPhase(timestamp, "Waning Crescent");
    //     vm.warp(timestamp);
    // }

    function test_MoonPhase() public view {
        assertMoonPhase(1831183200, "Full Moon"); // Jan 11th 2028
    }

    function test_CanUpdateAllowedContract() public {
        moonphase.setAllowedContract(address(this));
        assertEq(moonphase.allowedContract(), address(this));
    }

    function test_MoonphaseForMay2025() public view {
        assertMoonPhase(1746075600, "Waxing Crescent"); // May 1st 2025
        assertMoonPhase(1746162000, "Waxing Crescent"); // May 2nd 2025
        assertMoonPhase(1746248400, "Waxing Crescent"); // May 3rd 2025
        assertMoonPhase(1746334800, "Waxing Crescent"); // May 4th 2025
        assertMoonPhase(1746421200, "First Quarter"); // May 5th 2025
        assertMoonPhase(1746507600, "Waxing Gibbous"); // May 6th 2025
        assertMoonPhase(1746594000, "Waxing Gibbous"); // May 7th 2025
        assertMoonPhase(1746680400, "Waxing Gibbous"); // May 8th 2025
        assertMoonPhase(1746766800, "Waxing Gibbous"); // May 9th 2025
        assertMoonPhase(1746853200, "Waxing Gibbous"); // May 10th 2025
        assertMoonPhase(1746939600, "Waxing Gibbous"); // may 11th
        assertMoonPhase(1747026000, "Full Moon"); // May 12th 2025
        assertMoonPhase(1747112400, "Full Moon"); // May 13th 2025
        assertMoonPhase(1747198800, "Waning Gibbous"); // May 14th 2025
        assertMoonPhase(1747285200, "Waning Gibbous"); // May 15th 2025
        assertMoonPhase(1747371600, "Waning Gibbous"); // May 16th 2025
        assertMoonPhase(1747458000, "Waning Gibbous"); // May 17th 2025
        assertMoonPhase(1747544400, "Waning Gibbous"); // May 18th 2025
        assertMoonPhase(1747630800, "Waning Gibbous"); // May 19th 2025
        assertMoonPhase(1747717200, "Last Quarter"); // May 20th 2025
        assertMoonPhase(1747803600, "Waning Crescent"); // May 21st 2025
        assertMoonPhase(1747890000, "Waning Crescent"); // May 22nd 2025
        assertMoonPhase(1747976400, "Waning Crescent"); // May 23rd 2025
        assertMoonPhase(1748062800, "Waning Crescent"); // May 24th 2025
        assertMoonPhase(1748149200, "Waning Crescent"); // May 25th 2025
        assertMoonPhase(1748235600, "Waning Crescent"); // May 26th 2025
        assertMoonPhase(1748322000, "New Moon"); // May 27th 2025
        assertMoonPhase(1748408400, "New Moon"); // May 28th 2025
        assertMoonPhase(1748494800, "Waxing Crescent"); // May 29th 2025
        assertMoonPhase(1748581200, "Waxing Crescent"); // May 30th 2025
        assertMoonPhase(1748667600, "Waxing Crescent"); // May 31st 2025
    }

    function assertMoonPhase(uint256 timestamp, string memory expectedPhase) internal view {
        assertEq(moonphase.moonPhase(timestamp), expectedPhase);
    }
}
