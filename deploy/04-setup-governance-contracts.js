const { ethers, network } = require("hardhat");
const verify = require("../utils/verify");
const { ADDRESS_ZERO } = require("../helper-hardhat.config");

module.exports = async (hre) => {
    const { getNamedAccounts, deployments, network } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy, log, get } = deployments;

    const governer = await ethers.getContract("MyGoverner", deployer);
    const timeLock = await ethers.getContract("TimeLock", deployer);

    log("----------------------");
    const proposerRole = await timeLock.PROPOSER_ROLE();
    const executorRole = await timeLock.EXECUTOR_ROLE();
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

    const proposerTx = await timeLock.grantRole(proposerRole, governer.target);
    await proposerTx.wait(1);
    const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO);
    await executorTx.wait(1);
    const revokeTx = await timeLock.revokeRole(adminRole, deployer);
    await revokeTx.wait(1);
};
