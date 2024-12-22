# NodeMCU Desktop

A lightweight and fast desktop application built with [Tauri](https://tauri.app/) and [React](https://react.dev).

---



## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Development](#development)
- [Build](#build)

---


## Features

- Cross-platform support: Currently only on Windows.
- Lightweight with a small bundle size.
- Built with React.

---


## Installation

```
yarn add
```


### Prerequisites

1. Install [Node.js](https://nodejs.org/) (LTS recommended).
2. Install [Rust](https://www.rust-lang.org/) and the `cargo` package manager.

### Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/Fr33yr/NodeMCU_Desktop_Client.git
   cd your-tauri-app


## Development
Ensure you have the prerequisites installed.
Start the application in development mode:
```
yarn tauri dev
```


## Build
To build the application for production:
```
yarn tauri build
```
The compiled binaries will be located in the `src-tauri/target/release/bundle/nsis` and `src-tauri/target/release/bundle/msi` directories.


### Directory Structure
```
.
├── .gradle
├── .idea
├── .vscode
├── dist
├── node_modules
├── public
├── src
│   └── (frontend source code)
├── src-tauri
│   └── (Tauri backend code)
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock

```



