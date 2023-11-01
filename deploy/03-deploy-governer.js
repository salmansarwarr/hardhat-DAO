const { ethers, network } = require("hardhat");
const verify = require("../utils/verify");
const { developmentChains, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE } = require("../helper-hardhat.config");

module.exports = async (hre) => {
    const { getNamedAccounts, deployments, network } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy, log, get } = deployments;

    const governanceToken = await get("GovernanceToken");
    const timeLock = await get("TimeLock");


    log("----------------------");
    const myGoverner = await deploy("MyGoverner", {
        from: deployer,
        args: [
            governanceToken.address,
            timeLock.address,
            VOTING_DELAY,
            VOTING_PERIOD,
            QUORUM_PERCENTAGE,
        ],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });
    log(`Deployed Governor to address ${myGoverner.address}`);

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(myGoverner.address, []);
    }
};

