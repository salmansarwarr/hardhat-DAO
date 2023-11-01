const index = 0;
const fs = require('fs')
const {proposalsFile, developmentChains, VOTING_PERIOD} = require('../helper-hardhat.config');
const { network, ethers } = require('hardhat');
const moveBlocks = require('../utils/move-blocks');

const main = async (proposalIndex) => {
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
    const proposalId = proposals[network.config.chainId][proposalIndex];
    
    // 1 = Against, 0 = For, 2 = Abstrain
    const voteWay = 1;
    const reason = "I like this proposal";
    const governer = await ethers.getContract("MyGoverner");
    const voteTxResponse = await governer.castVoteWithReason(proposalId, voteWay, reason)
    await voteTxResponse.wait(1);
    if(developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1)
    }
    console.log("Voted!");
}

main(index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
