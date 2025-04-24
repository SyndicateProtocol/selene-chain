// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

contract Moonphase {
    /// @notice Computes the phase of the moon for a given timestamp
    /// @param timestamp The timestamp to compute the moon phase for
    /// @return name The name of the moon phase
    function moonPhase(uint256 timestamp) public pure returns (string memory name) {
        uint8 phaseIndex = getPhaseIndex(timestamp);
        return getPhaseName(phaseIndex);
    }

    /// @notice Computes the phase index for a given timestamp
    /// @param timestamp The timestamp to compute the phase index for
    /// @return phaseIndex The phase index
    function getPhaseIndex(uint256 timestamp) internal pure returns (uint8 phaseIndex) {
        // Known new moon: Jan 6, 2000 at 18:14 UTC
        uint256 synodicMonth = 2551443; // seconds in a synodic month (~29.5306 days)
        uint256 newMoonReference = 947182440; // reference new moon timestamp

        uint256 elapsed = timestamp - newMoonReference;
        uint256 phaseTime = elapsed % synodicMonth;

        // Calculate the phase from 0 to 29
        return uint8((phaseTime * 30) / synodicMonth);
    }

    /// @notice Computes the name of the moon phase for a given phase index
    /// @param phase The phase index to compute the name for
    /// @return name The name of the moon phase
    function getPhaseName(uint8 phase) internal pure returns (string memory name) {
        require(phase >= 0 && phase <= 29, "Invalid phase");
        if (phase == 0 || phase == 29) return "New Moon";
        if (phase >= 1 && phase <= 6) return "Waxing Crescent";
        if (phase == 7) return "First Quarter";
        if (phase >= 8 && phase <= 13) return "Waxing Gibbous";
        if (phase >= 14 && phase <= 15) return "Full Moon";
        if (phase >= 16 && phase <= 21) return "Waning Gibbous";
        if (phase == 22) return "Last Quarter";
        if (phase >= 23 && phase <= 28) return "Waning Crescent";
    }
}
