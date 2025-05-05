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

| Contract Name             | Address                                                                                                                                     |
| -----------------------   | ----------------- |
| MoonphasePermissionModule | 0xc75954B9B4Bb4B80883Cf645744612138b7e4870 |
| MoonInteraction           | 0x268e0A6c79107f74Cf5Ef3067C110952e9127843 |
| Angel721                  | 0x9cecA064CaB740E5F511b426c7dBD7820795fe13 |
| ERC20                     | 
