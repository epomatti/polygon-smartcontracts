require('dotenv').config();

const contract_name = process.env.CONTRACT_NAME;
const token_id = process.env.TOKEN_ID;
const contract_address = process.env.CONTRACT_ADDRESS;

const main = async () => {

  const Contract = await ethers.getContractFactory(contract_name);

  const contract = await Contract.attach(
    contract_address
  );

  await contract.setTokenURI(token_id, "ipfs://bafyreidlp4mgk2xvmff32uvcneyyn2blpoegsuywehhi4pz6peul7nepwi/metadata.json");

  console.log(`Updated Token URI: ${token_id}`);
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