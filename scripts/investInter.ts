require("dotenv").config({ path: ".env" });
import { ethers } from "hardhat";

async function main() {
    
const CONTRACT_ADDRESS = "0xe7a28A901CF0F75CF467d54788781a27f043aD51";

const amount = ethers.utils.parseEther("0.1");
 
 const Invest = await ethers.getContractAt("Iinvest", CONTRACT_ADDRESS);
 const withdraw = await Invest.invest(200);
 console.log("everything", withdraw);

 const contractBal = await Invest.contractBalance();
 console.log("Our contract balance is", contractBal);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
