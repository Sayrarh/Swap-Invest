//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface Iinvest{
    function invest() external payable;
    function withdraw() external;
}