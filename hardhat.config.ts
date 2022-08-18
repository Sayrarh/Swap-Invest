require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
import "@nomiclabs/hardhat-ethers";
require("dotenv").config({ path: ".env" });


const ROPSTEN_API_KEY = process.env.ROPSTEN_API_KEY;
const RINKEBY_API_KEY = process.env.RINKEBY_API_KEY;
//contract address key
const PRIVATE_KEY  = process.env.PRIVATE_KEY ;


module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/c12b1c10cd8a498691b1dfd0a8e7b19f"
      }
    },
    ropsten: {
      url: ROPSTEN_API_KEY,
      accounts: [PRIVATE_KEY]

    },
    rinkeby: {
      url: RINKEBY_API_KEY,
      accounts: [PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: "WPSFJ5S9EVIJUYSSVW1G14AJQ578YJ3MCP"
  }
};