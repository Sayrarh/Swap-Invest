import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");


async function main() {
    const USDTAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAIAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

    const USDTHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";

    await helpers.impersonateAccount(USDTHolder);
    const impersonatedSigner = await ethers.getSigner(USDTHolder);

    const USDT = await ethers.getContractAt("IERC", USDTAddress, impersonatedSigner);
    const DAI = await ethers.getContractAt("IERC", DAIAddress);

    const USDT_bal = await USDT.balanceOf(USDTHolder);
    const DAI_bal = await DAI.balanceOf(USDTHolder);

     //logging the balance of the account
    console.log("THe USDT Balance is", USDT_bal);
    console.log("The DAi balance", DAI_bal);

   
    const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const amountOut = ethers.utils.parseUnits("1", "18");

// contract of uniswap helping us to swap
const UNISWAP = await ethers.getContractAt("IUniswap", UNIRouter, impersonatedSigner);
const amountIn = ethers.utils.parseUnits("1", "18");;
const deadline = Math.floor(Date.now() / 1000) + (60 * 10);
await USDT.approve(UNIRouter, amountOut);


// uint amountOut,
// uint amountInMax,
// address[] calldata path,
// address to,
// uint deadline

 await UNISWAP.swapTokensForExactTokens(amountOut, amountIn, [USDTAddress, DAIAddress], USDTHolder, deadline, {gasLimit: ethers.utils.hexlify(1000000)});

const balAfterUSDT = await USDT.balanceOf(USDTHolder);
const balAfterDAI = await DAI.balanceOf(USDTHolder);

// checking our balance after we swapped 
console.log("Your usdt balance after swap is", balAfterUSDT);
console.log("Your dai balance after swap is", balAfterDAI);

    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });