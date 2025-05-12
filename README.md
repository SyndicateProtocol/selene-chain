# 🌕 Selene Chain Lunar Sequencer

**Selene Chain** is an experimental blockchain experience that merges celestial mechanics with onchain infrastructure. Powered by **[Syndicate’s decentralized sequencing](https://syndicate.io/)**, Selene introduces a novel rule: **transactions are validated based on the current phase of the moon.**

## 🌓 What is Selene Chain?

Selene Chain is a blockchain with a mood.

It features a **custom sequencer controlled by lunar phases**, enforcing a dynamic, phase-dependent transaction policy. This means the validity of your transaction changes depending on whether the moon is full, new, or somewhere in between.

## 🌙 How It Works

Each lunar phase imposes unique constraints on what kinds of transactions are allowed:

| Phase               | Rule Description                                        |
| ------------------- | ------------------------------------------------------- |
| **🌑 New Moon**        | Prefers low calldata size                               |
| **🌒 Waxing Crescent** | Only broadcasts to an allowed contract                  |
| **🌓 First Quarter**   | Requires angel number donation (e.g., 111, 333, etc.)   |
| **🌔 Waxing Gibbous**  | Only allows function calls to `waxingGibbous()`         |
| **🌕 Full Moon**       | Only allows token interactions (ERC20, ERC721, ERC1155) |
| **🌖 Waning Gibbous**  | Requires high gas limit (≥ 2M)                          |
| **🌗 Last Quarter**    | Gas limit to calldata size ratio must be ≥ 16           |
| **🌘 Waning Crescent** | Only allows low-value transactions (≤ 0.01 ETH)         |

These rules are enforced onchain by the [`MoonphasePermissionModule`](./contracts/MoonphasePermissionModule.sol), which reads the moon phase using a timestamp-based algorithm and permits or rejects transactions accordingly.

## 🔭 Try It Live

[selene.demo.syndicate.io](https://selene.demo.syndicate.io/)

## 🧠 Tech Stack

* **Next.js** + **TypeScript** – frontend + API
* **Solidity** – lunar permission logic
* **Foundry** – contract dev/test
* **Syndicate Sequencer** – decentralized sequencing
* **PostgreSQL** – tx log storage
* **Tailwind CSS** – styling


## 📁 Repo Structure


* `contracts/` — Solidity smart contracts
* `app/` — Next.js app (routes, layout, styles)
* `components/` - UI components
* `db/` - Drizzle ORM