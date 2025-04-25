// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

import {Moonphase} from "./Moonphase.sol";
import {ICalldataPermissionModule} from "./interfaces/ICalldataPermissionModule.sol";

contract MoonphaseCalldataPermissionModule is ICalldataPermissionModule {
    Moonphase private immutable moonphase;

    constructor(Moonphase _moonphase) {
        moonphase = _moonphase;
    }

    function isCalldataAllowed(bytes calldata data) external view returns (bool) {
        return false;
    }
}
