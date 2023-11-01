const { network } = require("hardhat");

const moveBlocks = async (amount) => {
    console.log("Moving Time...");
    await network.provider.send("evm_increaseTime", [amount]);
    console.log(`Moved forward ${amount} seconds`);
};

module.exports = moveBlocks;
