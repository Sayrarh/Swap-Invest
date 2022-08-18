import { ethers } from "hardhat";

// contract address 0x00fb544D2Cd5f60d24BE3B74a10A4803Ce65e836
// transaction for contract creation: 0xee5d4298891c5605ffe65ee3f94b416c7a2891feb82725f959fdb499a622e29e
// transaction hash: 0x0f6297f8145e7d7a7c9cb94892e8e902864e5830cabe7cd3415d9278519d38ca

async function main() {

  const InvestContract = await ethers.getContractFactory("Invest");
  const investContract = await InvestContract.deploy();

  await investContract.deployed();
   console.log("Contract", investContract.address);


const amount = ethers.utils.parseEther("0.1");


  //  const Invest = await ethers.getContractAt("Iinvest", CONTRACT_ADDRESS);
 const withdraw = await investContract.invest({value: ethers.utils.parseEther("0.01") });
 const withdrawReceipt = await withdraw.wait();
 console.log("everything", withdrawReceipt);

 const contractBal = await investContract.getContractBalance();
 console.log("Our contract balance is", contractBal);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
