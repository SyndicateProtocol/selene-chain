// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Moonphase} from "../src/Moonphase.sol";

contract MoonphaseTest is Test {
    Moonphase public moonphase;

    function setUp() public {
        moonphase = new Moonphase();
    }

    function test_MoonphaseForMay2025() public view {
        assertMoonPhase(1746075600, "Waxing Crescent"); // may 1st
        assertMoonPhase(1746162000, "Waxing Crescent"); // may 2nd
        assertMoonPhase(1746248400, "Waxing Crescent"); // may 3rd
        assertMoonPhase(1746334800, "Waxing Crescent"); // may 4th
        assertMoonPhase(1746421200, "First Quarter"); // may 5th
        assertMoonPhase(1746507600, "Waxing Gibbous"); // may 6th
        assertMoonPhase(1746594000, "Waxing Gibbous"); // may 7th
        assertMoonPhase(1746680400, "Waxing Gibbous"); // may 8th
        assertMoonPhase(1746766800, "Waxing Gibbous"); // may 9th
        assertMoonPhase(1746853200, "Waxing Gibbous"); // may 10th
        assertMoonPhase(1746939600, "Waxing Gibbous"); // may 11th
        assertMoonPhase(1747026000, "Full Moon"); // may 12th
        assertMoonPhase(1747112400, "Full Moon"); // may 13th
        assertMoonPhase(1747198800, "Waning Gibbous"); // may 14th
        assertMoonPhase(1747285200, "Waning Gibbous"); // may 15th
        assertMoonPhase(1747371600, "Waning Gibbous"); // may 16th
        assertMoonPhase(1747458000, "Waning Gibbous"); // may 17th
        assertMoonPhase(1747544400, "Waning Gibbous"); // may 18th
        assertMoonPhase(1747630800, "Waning Gibbous"); // may 19th
        assertMoonPhase(1747717200, "Last Quarter"); // may 20th
        assertMoonPhase(1747803600, "Waning Crescent"); // may 21st
        assertMoonPhase(1747890000, "Waning Crescent"); // may 22nd
        assertMoonPhase(1747976400, "Waning Crescent"); // may 23rd
        assertMoonPhase(1748062800, "Waning Crescent"); // may 24th
        assertMoonPhase(1748149200, "Waning Crescent"); // may 25th
        assertMoonPhase(1748235600, "Waning Crescent"); // may 26th
        assertMoonPhase(1748322000, "New Moon"); // may 27th
        assertMoonPhase(1748408400, "New Moon"); // may 28th
        assertMoonPhase(1748494800, "Waxing Crescent"); // may 29th
        assertMoonPhase(1748581200, "Waxing Crescent"); // may 30th
        assertMoonPhase(1748667600, "Waxing Crescent"); // may 31st
    }

    function assertMoonPhase(uint256 timestamp, string memory expectedPhase) public view {
        assertEq(moonphase.moonPhaseName(moonphase.moonPhase(timestamp)), expectedPhase);
    }
}
