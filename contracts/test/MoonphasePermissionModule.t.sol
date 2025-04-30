// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MoonphasePermissionModule} from "../src/MoonphasePermissionModule.sol";

contract MoonphasePermisionModuleTest is Test {
    MoonphasePermissionModule public moonphase;
    address internal allowedContract = 0x1234567890123456789012345678901234567890;

    function setUp() public {
        moonphase = new MoonphasePermissionModule(allowedContract);
    }

    function test_NewMoon() public {
        uint256 timestamp = 1748322000;
        assertMoonPhase(timestamp, "New Moon");
        vm.warp(timestamp);

        bytes memory dataTooLongTx =
            hex"02f901cf0180843b9aca008504a817c8008094123456789012345678901234567890123456789080b90164dd02ceff00000000000000000000000012345678901234567890123456789012345678900000000000000000000000001234567890123456789012345678901234567890000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000001200000000000000000000000001234567890123456789012345678901234567890000000000000000000000000123456789012345678901234567890123456789000000000000000000000000000000000000000000000000000000000000000141234567890123456789012345678901234567890000000000000000000000000c080a04b6205ed1d128b2e9d18fb875841f96663fafaf4d40a17022a5c1d2e6371ceb5a05c99870b3cc90e0891f74e1da7c4dfdc3208649c762e32fd1ab1c6631073ade7";
        assertEq(moonphase.isAllowed(address(this), address(this), dataTooLongTx), false);

        bytes memory shortDataTx =
            hex"02f88d0180843b9aca008504a817c8008094123456789012345678901234567890123456789080a4e25fd8a70000000000000000000000001234567890123456789012345678901234567890c080a0b66504133b07a8c904a65422d0ccfe2d7f9c5a0c781b88ee5160b9c8a83898f9a07e68107449eae35b7ee4fca01e731380b746bb733e4cc4e5311aaf3fe92c4c3c";
        assertEq(moonphase.isAllowed(address(this), address(this), shortDataTx), true);
    }

    function test_WaxingCrescent() public {
        uint256 timestamp = 1746075600;
        assertMoonPhase(timestamp, "Waxing Crescent");
        vm.warp(timestamp);

        bytes memory invalidToAddressTx =
            hex"02f88d0180843b9aca008504a817c8008094123456789012345678901234567890123456788080a44b4154800000000000000000000000001234567890123456789012345678901234567890c080a05c931e51121a6c661ad2d24ec46c116488462400705bccd3acaf1e0b7a8cbce7a0090235aab2fd9b08d15872d2b062163fdc6dbeff7687ebcfc93b623c81ab7bad";
        assertEq(moonphase.isAllowed(address(this), address(this), invalidToAddressTx), false);

        bytes memory validToAddressTx =
            hex"02f88d0180843b9aca008504a817c8008094123456789012345678901234567890123456789080a44b4154800000000000000000000000001234567890123456789012345678901234567890c080a03ef7dbe2108c2c2b00a5e9da3cc543a5162e13ead9ac0e9ecd182ff475e7a023a0664037542a56067c873aa44243e97db2b2b0ec9e4c4c3ca7fb9a31b1e4a92950";
        assertEq(moonphase.isAllowed(address(this), address(this), validToAddressTx), true);
    }

    function test_FirstQuarter() public {
        uint256 timestamp = 1746421200;
        assertMoonPhase(timestamp, "First Quarter");
        vm.warp(timestamp);

        // 0.01 ETH
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8740180843b9aca008504a817c80080941234567890123456789012345678901234567880872386f26fc1000084b29f0835c080a0890de18b6b815bd10eeac5de76c6f9a4677a9a1fbfa3fce13ca6a907494ebbd8a067c468b03a56963f9997b87c2c7363a9bc3ad97e48f0174e66d23a22acb50dfb"
            ),
            false
        );

        // angel number, any value with a single repeating digit at least 3 times

        // 0.11 ETH
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8750180843b9aca008504a817c80080941234567890123456789012345678901234567880880186cc6acd4b000084b29f0835c001a0683bf86f4bdb5cb8fc92278dcf6ba63829695e6fbbe863a742e23a9aa31c422ca0371f64c30b46842eeb861ea38146e3105416f52d3f945b82693a82b5c19d6921"
            ),
            false
        );

        // 0.000000000000111 ETH
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8700180843b9aca008504a817c800809412345678901234567890123456789012345678808301b198847da7d5a7c080a09499014d7cbb2c4ab5ad18dd1b77853c18857b9e485bd5df262276f350bb2916a079efe42cb8af59812cb03c8c2c810c7123779e1b2b9690c3c828477eaf77989c"
            ),
            true
        );

        // 0.00103 ETH
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8740180843b9aca008504a817c800809412345678901234567890123456789012345678808703a8c7901e600084b29f0835c001a06c8bc2b6e5ae4b2659071ad6ac27f94f75c6087f8b5e2dffc10268b656972b2ca00541cb14eb67698a641556de2d4f514157fb11436c64b1a0cf87a80b3d646ea4"
            ),
            false
        );

        // 0.111 ETH
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8750180843b9aca008504a817c8008094123456789012345678901234567890123456788088018a59e97211800084b29f0835c001a09a0987c641f7cb4935bce34e1bf69e2a01a0a3a20ea766639bc304bf82c04ec2a061d0a17e50473cd97e2d8d8b3c788fe5fbf38c96de611e3dbf64e7e316f2d8c0"
            ),
            true
        );

        // 444 ETH
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8760180843b9aca008504a817c80080941234567890123456789012345678901234567880891811bcdf965170000084b29f0835c080a01631ac5f7dcd132111e495310494d5ec0c1688f2ad88ead3fec190316dc403e3a02ce23a35ac3076bb801a20b098f46ebcba6912141884a1808915168ed3701ff1"
            ),
            true
        );

        // 9999.99 ETH
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8770180843b9aca008504a817c800809412345678901234567890123456789012345678808a021e19bd42c8427f000084b29f0835c080a0c860caa773efd0bf86e772c9f37d0e677597a992247a5c94ca1083bca95e176ea06920b232c0f71ac3aea327c97f61f113ee74bff0d2d75a7e244bdc3dfce95ea4"
            ),
            true
        );

        // 9999.991 ETH
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8770180843b9aca008504a817c800809412345678901234567890123456789012345678808a021e19c0d046e745800084b29f0835c001a07e404b4b823c9695d0829b3731c1dc64195d80566222b799487f287b388bccf4a01df71127a8ffd6276cc8c34229c48aabb997cd100d0723903ad13f2d01678cdf"
            ),
            false
        );
    }

    function test_WaxingGibbous() public {
        uint256 timestamp = 1746507600;
        assertMoonPhase(timestamp, "Waxing Gibbous");
        vm.warp(timestamp);

        // call to notWaxingGibbous()
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8770180843b9aca008504a817c800809412345678901234567890123456789012345678808a021e19c0d046e745800084b29f0835c001a07e404b4b823c9695d0829b3731c1dc64195d80566222b799487f287b388bccf4a01df71127a8ffd6276cc8c34229c48aabb997cd100d0723903ad13f2d01678cdf"
            ),
            false
        );

        // call to waxingGibbous()
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8700180843b9aca008504a817c800809412345678901234567890123456789012345678808301b19884fbbdfdfbc001a0ca05628286f3b9eaf249d485b9fd7d1fc905a234ac5ef82ace81a0e8862040c0a0303e95b753693841321d063d4331ace05f3ab0f062b0ed5c89578987d45cbcb6"
            ),
            true
        );
    }

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
