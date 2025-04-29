// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {RLPTxBreakdown} from "../RLP/RLPTxBreakdown.sol";
import {ICalldataPermissionModule} from "../interfaces/ICalldataPermissionModule.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Angel721 is ERC721 {
    constructor() ERC721("ANGEL", "ANGEL") {}

    function mint(address to) public payable {
        require(msg.value == 111, "Must send 111 ETH");
        _mint(to, 1);
    }
}
