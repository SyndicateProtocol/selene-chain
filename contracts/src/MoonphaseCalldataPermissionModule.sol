// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

import {Moonphase} from "./Moonphase.sol";
import {ICalldataPermissionModule} from "./interfaces/ICalldataPermissionModule.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MoonphaseCalldataPermissionModule is ICalldataPermissionModule, Ownable {
    Moonphase private immutable moonphase;

    constructor(Moonphase _moonphase) Ownable(msg.sender) {
        moonphase = _moonphase;
    }

    function isCalldataAllowed(bytes calldata data) external view returns (bool) {
        return moonphase.isAllowed(data);
    }
}
