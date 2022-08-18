import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");


async function main() {
    const USDTAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAIAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    const WethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

    const OwnerAddr = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";

    await helpers.impersonateAccount(OwnerAddr);
    const impersonatedSigner = await ethers.getSigner(OwnerAddr);


    const USDT = await ethers.getContractAt("IERC", USDTAddress, impersonatedSigner);
    const DAI = await ethers.getContractAt("IERC", DAIAddress);
    const WETH = await ethers.getContractAt("IERC", WethAddress);

   // const USDT_bal = await USDT.balanceOf(OwnerAddr);
    const DAI_bal = await DAI.balanceOf(OwnerAddr);

    const ETH_bal = await impersonatedSigner.getBalance();
    const USDT_bal = await USDT.balanceOf(OwnerAddr);

     //logging the balance of the accounTS
    console.log("USDT balance before swap", USDT_bal);
    console.log("eth balance before swap", ETH_bal);
   
    const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const amountOut = ethers.utils.parseUnits("1", "18");

    // contract of uniswap helping us to swap
    const UNISWAP = await ethers.getContractAt("IUniswap", UNIRouter, impersonatedSigner);
    const amountInMax = ethers.utils.parseUnits("1", "18");;
    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);
    await USDT.approve(UNIRouter, amountOut);

    await UNISWAP.swapTokensForExactETH(amountOut, amountInMax, [USDTAddress, WethAddress], impersonatedSigner.address, deadline);

    const USDT_bal2 = await USDT.balanceOf(OwnerAddr);
    const ETH_bal2 = await impersonatedSigner.getBalance();
    // const wethBal2 = await WETH.balanceOf(impersonatedSigner.address);
    // const daiBalAfter = await DAI.balanceOf(impersonatedSigner.address);

    console.log("USDT balance after swap", USDT_bal2);
    console.log("eth balance after swap", ETH_bal2);
    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });