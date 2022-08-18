import { ethers } from "hardhat";

async function main() {

  const InvestContract = await ethers.getContractFactory("Invest");
  const investContract = await InvestContract.deploy();

  await investContract.deployed();
   console.log("Contract", investContract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
