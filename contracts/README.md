## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

# Deployments

The following contracts have all been deployed to Selene

| Contract Name             | Address                                    | Chain    |
| -----------------------   | ------------------------------------------ | -------  |
| MoonphasePermissionModule | 0xDa3F865c0EDfE20847a561ED2fe19356C12C25Fd | Exo      |
| MoonInteraction           | 0xE9F5Cda5DE9590F371D1593612880cB6Ad59C48E | Selene   |
| Angel721                  | 0x9cecA064CaB740E5F511b426c7dBD7820795fe13 | Selene   |
| ERC20                     | 0x49436F4956E80D9e27826ec6e43f06b9a4E54C69 | Selene   |
| ERC721                    | 0x00aE9e627E3601928cc793De95923346564aC62C | Selene   |
| ERC1155                   | 0xe2874972fE163A86f08a4C25E6d41845487397D9 | Selene   |
