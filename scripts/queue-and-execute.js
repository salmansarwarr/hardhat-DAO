const { ethers, network } = require("hardhat");
const {
    developmentChains,
    VOTING_DELAY,
    MIN_DELAY,
    PROPOSAL_DESCRIPTION,
    FUNC,
    NEW_STORE_VALUE,
} = require("../helper-hardhat.config");
const moveBlocks = require("../utils/move-blocks");
const moveTime = require("../utils/move-time");

const queueAndExexute = async () => {
    const box = await ethers.getContract("Box");
    const encodedFunctionCall = box.interface.encodeFunctionData(FUNC, [NEW_STORE_VALUE]);
    const descriptionHash = ethers.keccak256(
        ethers.toUtf8Bytes(PROPOSAL_DESCRIPTION)
    );

    const governer = await ethers.getContract("MyGoverner");
    console.log("Queueing...");
    const queueTx = await governer.queue(
        [box.target],
        [0],
        [encodedFunctionCall],
        descriptionHash
    );
    await queueTx.wait(1);

    if (developmentChains.includes(network.name)) {
        await moveTime(MIN_DELAY + 1);
        await moveBlocks(VOTING_DELAY + 1);
    }

    console.log("Executing...");
    const executeTx = await governer.execute(
        [box.target],
        [0],
        [encodedFunctionCall],
        descriptionHash
    );
    await executeTx.wait(1);

    const boxNewValue = await box.retrieve();
    console.log(`New Box Value: ${boxNewValue.toString()}`);
};

queueAndExexute()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
