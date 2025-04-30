// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MoonphasePermissionModule} from "../src/MoonphasePermissionModule.sol";

contract MoonphasePermisionModuleTest is Test {
    MoonphasePermissionModule public moonphase;
    address internal allowedContract = 0x1234567890123456789012345678901234567890;
    address internal owner = address(this);

    function setUp() public {
        moonphase = new MoonphasePermissionModule(allowedContract, owner);
    }

    function test_NewMoon() public {
        uint256 timestamp = 1748322000;
        assertMoonPhase(timestamp, "New Moon");
        vm.warp(timestamp);

        // data too large
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f901cf0180843b9aca008504a817c8008094123456789012345678901234567890123456789080b90164dd02ceff00000000000000000000000012345678901234567890123456789012345678900000000000000000000000001234567890123456789012345678901234567890000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000001200000000000000000000000001234567890123456789012345678901234567890000000000000000000000000123456789012345678901234567890123456789000000000000000000000000000000000000000000000000000000000000000141234567890123456789012345678901234567890000000000000000000000000c080a04b6205ed1d128b2e9d18fb875841f96663fafaf4d40a17022a5c1d2e6371ceb5a05c99870b3cc90e0891f74e1da7c4dfdc3208649c762e32fd1ab1c6631073ade7"
            ),
            false
        );

        // valid data size
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f88d0180843b9aca008504a817c8008094123456789012345678901234567890123456789080a4e25fd8a70000000000000000000000001234567890123456789012345678901234567890c080a0b66504133b07a8c904a65422d0ccfe2d7f9c5a0c781b88ee5160b9c8a83898f9a07e68107449eae35b7ee4fca01e731380b746bb733e4cc4e5311aaf3fe92c4c3c"
            ),
            true
        );
    }

    function test_WaxingCrescent() public {
        uint256 timestamp = 1746075600;
        assertMoonPhase(timestamp, "Waxing Crescent");
        vm.warp(timestamp);

        // invalid to address
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f88d0180843b9aca008504a817c8008094123456789012345678901234567890123456788080a44b4154800000000000000000000000001234567890123456789012345678901234567890c080a05c931e51121a6c661ad2d24ec46c116488462400705bccd3acaf1e0b7a8cbce7a0090235aab2fd9b08d15872d2b062163fdc6dbeff7687ebcfc93b623c81ab7bad"
            ),
            false
        );

        // valid to address
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f88d0180843b9aca008504a817c8008094123456789012345678901234567890123456789080a44b4154800000000000000000000000001234567890123456789012345678901234567890c080a03ef7dbe2108c2c2b00a5e9da3cc543a5162e13ead9ac0e9ecd182ff475e7a023a0664037542a56067c873aa44243e97db2b2b0ec9e4c4c3ca7fb9a31b1e4a92950"
            ),
            true
        );
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

        // call to waxingGibbouss()
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8700180843b9aca008504a817c800809412345678901234567890123456789012345678808301b198845ef9ac84c080a0face56c2d4ed7d89997b8bf7d8222a4036855f933c3af82fab67ee5826e0359aa011f4643a3b515bcaf58d758e1d4321716b23fdc1c0f866120a2d7743f53babd1"
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

    function test_FullMoon() public {
        uint256 timestamp = 1747026000;
        assertMoonPhase(timestamp, "Full Moon");
        vm.warp(timestamp);

        // call to somethingElse(address,bool)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8ae0180843b9aca008504a817c8008094123456789012345678901234567890123456788080b844ea1dd71900000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000000000000000001c080a056fce706af6d9a971f3f68a9b33ff77bc6639f36c81ca048a3cf4c3092a1005aa05c605602de77a7f37c75dc98a15c21d7ba9ab59e64ead1dfe926b3b6c18433d5"
            ),
            false
        );

        // ERC20
        // transfer(address,uint256)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8ae0180843b9aca008504a817c8008094123456789012345678901234567890123456788080b844a9059cbb00000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000de0b6b3a7640000c001a0016b6a133a788bd2a6049d3e8bd95ead8e870f694b992e5d23cc85ea137015aca065dd06a147ba86d24527866d8d4a6620d7e9ab20efe6c7446e45ab302324f522"
            ),
            true
        );
        // approve(address,uint256)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8ae0180843b9aca008504a817c8008094123456789012345678901234567890123456788080b844095ea7b300000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000de0b6b3a7640000c001a0b5b3779e726fc82b8fe8413e9f3529c4a6ee2fa2b3a7d0d2135cfa4eb5fb9b16a064c82ab59be72bbc44b8c4775cbac650d6185689fbad721be26c5d9a521f47fc"
            ),
            true
        );
        // transferFrom(address,address,uint256)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8ce0180843b9aca008504a817c8008094123456789012345678901234567890123456788080b86423b872dd000000000000000000000000123456789012345678901234567890123456789000000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000de0b6b3a7640000c080a0e6c173081e4be9bc5b0562ce229751ad99384ead892fec1f5bf83d261c2c35c4a0362954f1faee490b08527d4898fb461a4731eec4adb1214693c70cb70c266d8c"
            ),
            true
        );

        // ERC721 & ERC1155
        // safeTransferFrom(address,address,uint256)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8ce0180843b9aca008504a817c8008094123456789012345678901234567890123456788080b86442842e0e000000000000000000000000123456789012345678901234567890123456789000000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000de0b6b3a7640000c001a0d568b439cc01a729e8b972608f4f402b7e8d039db062fb6575190c34372dd458a067a7e0db51104e2d53cd5b0ffbbda13ddd1171a42e56a4872d3cad8ee98a4e8b"
            ),
            true
        );
        // safeTransferFrom(address,address,uint256,string)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f9012e0180843b9aca008504a817c8008094123456789012345678901234567890123456788080b8c43e23f586000000000000000000000000123456789012345678901234567890123456789000000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000c001a0fb3e7d506a198c5c5d98574deb1df10f3a90f3c4224f1e8ec06ad6abc72f0332a028e5266fb59a022fc64f89958984296f72d092baf77e2955ded18fcdfcc52439"
            ),
            true
        );
        // transferFrom(address,address,uint256,bytes)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f9010e0180843b9aca008504a817c8008094123456789012345678901234567890123456788080b8a4ab67aa58000000000000000000000000123456789012345678901234567890123456789000000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000c001a05a5a9da3271c92a2ab8773c30d7744d0049b0c0e8c2dd1b65c1cb984f28ebe83a022170c45dcd0cf42d2ab8a1854628093a913ec09d31cc7aafc020fc5b5f35e81"
            ),
            true
        );
        // setApprovalForAll(address,bool)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8ae0180843b9aca008504a817c8008094123456789012345678901234567890123456788080b844a22cb46500000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000000000000000001c080a02d10bb5920d7cd10c45a0f55ab22f7212150500a641a5d2b2379eb33551d37c6a0267eaf930ebdc7ba52a4890d8014ddb35b23b5e6bea1d86e7b162ed7dd799fe9"
            ),
            true
        );
    }

    function test_WaningGibbous() public {
        uint256 timestamp = 1747198800;
        assertMoonPhase(timestamp, "Waning Gibbous");
        vm.warp(timestamp);

        // Low gas limit (200)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f86e0180843b9aca008504a817c80081c89412345678901234567890123456789012345678808084c7f97534c001a03a0c2337147b56c2b15550dd1a2de9531efef3ad0adc97ae4a56e5df361ab44aa02d6b305a38164e9557f54250a949dd4e272e5945a880d30ebdd44e1e28fbf94d"
            ),
            false
        );

        // High gas limit (2_000_000)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8700180843b9aca008504a817c800831e84809412345678901234567890123456789012345678808084c7f97534c080a0293ef46fcc404b5a46299406018a9546d01bc2655505683206de53ee2db8755ba03d4542e16fbbf8c0d86f24361f8a564f3b686b324e8a6955c467e744f4936f42"
            ),
            true
        );
    }

    function test_LastQuarter() public {
        uint256 timestamp = 1747717200;
        assertMoonPhase(timestamp, "Last Quarter");
        vm.warp(timestamp);

        // @note TODO: implement these
        // Low gas limit to calldata ratio (5): (gas = 2_000, data.length = 388)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f901f90180843b9aca008504a817c8008207d094123456789012345678901234567890123456788088016345785d8a0000b901849960e701000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000002a30783132333435363738393031323334353637383930313233343536373839303132333435363738393000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a30783132333435363738393031323334353637383930313233343536373839303132333435363738393000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a30783132333435363738393031323334353637383930313233343536373839303132333435363738393000000000000000000000000000000000000000000000c080a06e4ca6435d7c2bdfeeb8b0236ba0f3547fe558a2627ae5cb75e1aa80af3dc70ba00401bec5bf016e27ebadf13dab0622dab4639169d9e60ac24cb86f597be3d545"
            ),
            false
        );

        // High gas limit to calldata ratio (5_154): (gas = 2_000_000, data.length = 388)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f901fa0180843b9aca008504a817c800831e848094123456789012345678901234567890123456788088016345785d8a0000b901849960e701000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000002a30783132333435363738393031323334353637383930313233343536373839303132333435363738393000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a30783132333435363738393031323334353637383930313233343536373839303132333435363738393000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a30783132333435363738393031323334353637383930313233343536373839303132333435363738393000000000000000000000000000000000000000000000c080a0ea1772e32cfea4b2e4a59bbc7a12ab0a075986010f6bc3efadcf63d1aa478feea078f44e9b466167ad215b3b0a49f64ba3ed2ad963632df2738ed1b8a032cf2b1c"
            ),
            true
        );
    }

    function test_WaningCrescent() public {
        uint256 timestamp = 1747803600;
        assertMoonPhase(timestamp, "Waning Crescent");
        vm.warp(timestamp);

        // Large value (0.5 ETH)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8750180843b9aca008504a817c800809412345678901234567890123456789012345678808806f05b59d3b2000084c7f97534c080a0a2fca9cecb7d80db11deb1166cf29f5115da2585d0ea256f11b9ad141e0b3d0ba04acdf2f85adad61317d170864b93810383edc1792286d633b7747c0487e5d59d"
            ),
            false
        );

        // Small value (0.1 ETH)
        assertEq(
            moonphase.isAllowed(
                address(this),
                address(this),
                hex"02f8750180843b9aca008504a817c8008094123456789012345678901234567890123456788088016345785d8a000084c7f97534c080a056d7ee1dfa393aeba9e2dc5438b97c56c8f025d2da3eb142d7d31ec0cdcd2fcba004c696c73e5f67cd99a7c042a859c5d79010123ccb731b8c005acf5da59b0e97"
            ),
            true
        );
    }

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
