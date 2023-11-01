require("hardhat-deploy");
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
    networks: {
        hardhat: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
        localhost: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL || "",
            accounts: [process.env.PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 3,
        },
    },
    allowUnlimitedContractSize: true,
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY || "",
    },
    solidity: {
        compilers: [
            { version: "0.8.20" },
            { version: "0.8.19" },
            { version: "0.6.12" },
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    mocha: {
        timeout: 300000,
    },
};
