// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract Wallet {

    address payable public owner;

    event Deposit(uint256 indexed value);
    event Withdraw(uint256 indexed value, address indexed receiver);

    constructor(){
        owner = payable(tx.origin);
    }

    function deposit() public payable{
        emit Deposit(msg.value);
    }

    function withdraw(address payable receiver, uint256 value) public  onlyOwner checkWithdraw(value){
        receiver.transfer(value);
        emit Withdraw(value,receiver);
    }

    function balanceOf() public view returns (uint){
        return address(this).balance;
    }

    receive() external payable {}
    fallback() external payable {}

    modifier onlyOwner(){
        require(tx.origin == owner, "Only owner can withdraw");
        _;
    }

    modifier checkWithdraw(uint256 value){
        uint256 balance = balanceOf();
        require(balance > value , "Insufficient funds" );
        _;
    }

}