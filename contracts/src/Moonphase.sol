// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

contract Moonphase {
    /// @notice Computes the phase of the moon for a given timestamp
    /// @param timestamp The timestamp to compute the moon phase for
    /// @return phase The phase of the moon:
    /// 0 & 29 = New Moon
    /// 1-6 = Waxing Crescent
    /// 7 = First Quarter
    /// 8-13 = Waxing Gibbous
    /// 14-15 = Full Moon
    /// 16-21 = Waning Gibbous
    /// 22 = Last Quarter
    /// 23-28 = Waning Crescent
    function moonPhase(uint256 timestamp) public pure returns (uint8 phase) {
        // Known new moon: Jan 6, 2000 at 18:14 UTC
        uint256 synodicMonth = 2551443; // seconds in a synodic month (~29.5306 days)
        uint256 newMoonReference = 947182440; // reference new moon timestamp

        uint256 elapsed = timestamp - newMoonReference;
        uint256 phaseTime = elapsed % synodicMonth;

        // Calculate the phase from 0 to 29
        uint8 phaseIndex = uint8((phaseTime * 30) / synodicMonth);
        return phaseIndex;
    }

    /// @notice Computes the name of the moon phase for a given phase index
    /// @param phase The phase index to compute the name for
    /// @return name The name of the moon phase
    function moonPhaseName(uint8 phase) public pure returns (string memory name) {
        require(phase >= 0 && phase <= 29, "Invalid phase");
        if (phase == 0 || phase == 29) {
            return "New Moon";
        }
        if (phase >= 1 && phase <= 6) {
            return "Waxing Crescent";
        }
        if (phase == 7) {
            return "First Quarter";
        }
        if (phase >= 8 && phase <= 13) {
            return "Waxing Gibbous";
        }
        if (phase >= 14 && phase <= 15) {
            return "Full Moon";
        }
        if (phase >= 16 && phase <= 21) {
            return "Waning Gibbous";
        }
        if (phase == 22) {
            return "Last Quarter";
        }
        if (phase >= 23 && phase <= 28) {
            return "Waning Crescent";
        }
    }
}
