
# divvi
dApp built on the Ethereum blockchain using Truffle and web3. Allows users to earn Divvi Coins by watching ads and then distribute those coins to charities of their choosing.

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Installing

Truffle and TestRPC

```
$ npm install -g truffle
$ npm install -g ethereumjs-testrpc
```

Geth

```
$ brew tap ethereum/ethereum
$ brew install ethereum
$ geth --testnet account new
$ geth --testnet --fast --rpc --rpcapi eth,net,web3,personal
```

To run TestRPC:

```
$ testRPC
```

In a separate terminal window, use [nGrok](https://ngrok.com/docs/2) to connect to your TestRPC Node. Download by clicking the link above and following the installation instructions. Once installed, run the following to expose your node running on port 8545:

```
$ ngrok http 8545
```

Once running, replace the web3 provider in divvi/src/components/Cards/views/charities.js with your ngrok forwarding address. Update the account addresses in the divvi/src/data/charitylist.json with test accounts provided when you started your testRPC node.

## Built With

* [Truffle](http://truffleframework.com/) - The framework used to build, compile, and deploy Ethereum smart contracts.
* [web3](https://github.com/ethereum/web3.js/) - Library used to interact with smart contracts using JSON-RPC.
* [TestRPC](https://github.com/ethereumjs/testrpc) - RPC client used for testing.
* [React Native](https://facebook.github.io/react-native/) - Used to build native mobile application.
* [Redux](http://redux.js.org/) - Used to manage application state
* [NativeBase](https://nativebase.io/) - React Native components and styling.
* [ngrok](https://ngrok.com/docs/2) - Used to connect with TestRPC Node from React Native Application

