const { ethers } = require("hardhat");

const networkConfig = {
    11155111: {
        name: 'Sepolia',
        vrfCoordinatorV2: '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625',
        entryFee: ethers.parseEther("0.01"),
        keyHash: '0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c',
        subscriptionId: "5503",
        callbackGasLimit: "500000",
        interval: "30"
    },
    31337: {
        name: 'Hardhat',
        entryFee: ethers.parseEther("0.01"),
        keyHash: '0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c',
        callbackGasLimit: "500000",
        interval: "30"
    }
}

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const MIN_DELAY = 3600;
const developmentChains = ["hardhat", "localhost"];
const VOTING_DELAY = 1;
const VOTING_PERIOD = 5;
const QUORUM_PERCENTAGE = 4;
const proposalsFile = "proposals.json"
const FUNC = "store"
const PROPOSAL_DESCRIPTION = "Proposal #1 77 in the Box!"
const NEW_STORE_VALUE = 77

module.exports = {FUNC, NEW_STORE_VALUE, PROPOSAL_DESCRIPTION, proposalsFile, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE,ADDRESS_ZERO, MIN_DELAY, networkConfig, developmentChains };