const { ethers, network } = require("hardhat");
const {developmentChains, VOTING_DELAY, proposalsFile, PROPOSAL_DESCRIPTION, FUNC, NEW_STORE_VALUE} = require('../helper-hardhat.config')
const moveBlocks = require('../utils/move-blocks');
const fs = require('fs');

const propose = async (args, functionToCall, proposalDesc) => {
    const governer = await ethers.getContract("MyGoverner");
    const box = await ethers.getContract("Box");
    const encodedFunctionCall = box.interface.encodeFunctionData(
        functionToCall,
        args
    );
    console.log(`Proposing ${functionToCall} on ${box.target} with ${args}`);
    console.log(`Proposal Description: ${proposalDesc}`);

    const proposeTx = await governer.propose(
        [box.target],
        [0],
        [encodedFunctionCall],
        proposalDesc
    )
    const proposeReciept = await proposeTx.wait(1);

    if(developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_DELAY + 1)
    }

    const proposalId = proposeReciept.logs[0].args.proposalId;
    let proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
    proposals[network.config.chainId.toString()].push(proposalId.toString());
    fs.writeFileSync(proposalsFile, JSON.stringify(proposals));

    if(developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_DELAY + 1)
    }
};

propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
