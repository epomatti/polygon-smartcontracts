require('dotenv').config();

const main = async () => {

  const Contract = await ethers.getContractFactory(process.env.CONTRACT);

  const contract = await Contract.attach(
    "0xB715A7A75E6CeEE3b763e467fA253324eE289928"
  );

  const fromAddr = "0xBE051c5bA51791877A4109d1C2E109Db4E2992bf";
  const toAddr = "0x7F70d558aB1808A918d07d77cac868A8D5B2CeBE";
  const tokenId = 0;

  // await contract.safeTransferFrom("0xBE051c5bA51791877A4109d1C2E109Db4E2992bf", "0x7F70d558aB1808A918d07d77cac868A8D5B2CeBE", 0);
  await contract['safeTransferFrom(address,address,uint256)'](fromAddr, toAddr, tokenId);

  console.log("Transferred");
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();