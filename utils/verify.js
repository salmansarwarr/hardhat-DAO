const verify = async (address, constructorArguments) => {
    console.log("verifying...");
    try {
        await run("verify:verify", {
            address,
            constructorArguments
        })
    } catch (error) {
        if(error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(error)
        }
    }
}

module.exports = verify