// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MoonphasePermissionModule} from "../src/MoonphasePermissionModule.sol";

contract MoonphaseTest is Test {
    MoonphasePermissionModule public moonphase;

    function setUp() public {
        moonphase = new MoonphasePermissionModule();
    }

    function test_MoonPhase() public view {
        assertMoonPhase(1831183200, "Full Moon"); // Jan 11th 2028
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

    function assertMoonPhase(uint256 timestamp, string memory expectedPhase) public view {
        assertEq(moonphase.moonPhase(timestamp), expectedPhase);
    }
}
