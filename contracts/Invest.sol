//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Invest {
    address investor;

    mapping(address => uint256) public balances;

    function invest() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        require(investor != address(0), "not a valid address");
        require(balances[msg.sender] > 0, "No funds ");
        uint256 amountDeposited = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amountDeposited);
    }

    function getContractBalance() public view returns(uint bal) {
      bal = address(this).balance;
    }

    receive() external payable{}
}