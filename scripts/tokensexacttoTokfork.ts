const helpers = require("@nomicfoundation/hardhat-network-helpers");
require("dotenv").config({ path: ".env" });
import { ethers } from "hardhat";

async function main() {
  const USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const UNISWAPRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  
  const USDTHolder = "0xB9711550ec6Dc977f26B73809A2D6791c0F0E9C8";
  await helpers.impersonateAccount(USDTHolder);
  const impersonatedSigner = await ethers.getSigner(USDTHolder);
  
  const USDT = await ethers.getContractAt(
    "IERC",
    USDTAddress,
    impersonatedSigner
    );
    const DAI = await ethers.getContractAt("IERC", DAIAddress);
    const ROUTER = await ethers.getContractAt(
      "IUniwap",
      UNISWAPRouter,
      impersonatedSigner
      );

    await USDT.approve(UNISWAPRouter, ethers.utils.parseUnits("2000", "18"), );
      
  const swapExactTokensForTokens = await ROUTER.swapExactTokensForTokens(
    2000,
    2000,
    [USDTAddress,
    DAIAddress],
    USDTHolder,
    Math.floor(Date.now() /1000) *(60 * 10), 
  );

  console.log("swapExactTokensForTokens: ", swapExactTokensForTokens);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});