require("dotenv").config({ path: ".env" });
import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
    
const CONTRACT_ADDRESS = "0x8B5dB2E0F053dB73E518e3ae12A790faAf94B597";

const amount = ethers.utils.parseEther("0.1");
 
 const Invest = await ethers.getContractAt("Iinvest", CONTRACT_ADDRESS);
 const withdraw = await Invest.invest(amount);
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
