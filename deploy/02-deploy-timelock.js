const { ethers, network } = require("hardhat");
const verify = require('../utils/verify');
const {developmentChains, MIN_DELAY} = require("../helper-hardhat.config")


module.exports = async (hre) => {
    const { getNamedAccounts, deployments, network } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy, log } = deployments;

    log("----------------------");
    const timeLock = await deploy("TimeLock", {
        from: deployer,
        args: [MIN_DELAY, [], [], deployer],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });
    log(`Deployed Timelock to address ${timeLock.address}`);

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(timeLock.address, [])
    }
};

