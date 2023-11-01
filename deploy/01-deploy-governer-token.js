const { ethers } = require("hardhat");
const verify = require('../utils/verify');
const {developmentChains} = require("../helper-hardhat.config")

module.exports = async (hre) => {
    const { getNamedAccounts, deployments, network } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy, log } = deployments;

    log("----------------------");
    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });
    log(`Deployed Governance Token to address ${governanceToken.address}`);

    await delegate(governanceToken.address, deployer);
    log("Delegated!");


    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(governanceToken.address, [])
    }
};

const delegate = async (governanceTokenAddress, delegatedAccount) => {
    const governanceToken = await ethers.getContractAt(
        "GovernanceToken",
        governanceTokenAddress
    );

    const tx = await governanceToken.delegate(delegatedAccount);
    await tx.wait(1);
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`);
};
