const { ethers, network } = require("hardhat");
const verify = require("../utils/verify");
const { developmentChains } = require("../helper-hardhat.config");

const VOTING_DELAY = 1;
const VOTING_PERIOD = 5;
const QUORUM_PERCENTAGE = 4;

module.exports = async (hre) => {
    const { getNamedAccounts, deployments, network } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy, log, get } = deployments;

    log("----------------------");
    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });
    log(`Deployed Box to address ${box.address}`);

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(box.address, []);
    }

    const timeLock = await ethers.getContract("TimeLock")
    const boxContract = await ethers.getContractAt("Box", box.address);
    const transferOwnerTx = await boxContract.transferOwnership(timeLock.target);
    await transferOwnerTx.wait(1);

    log("Gave access of box to timelock!");
};
