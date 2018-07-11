pragma solidity ^0.4.18;

contract Loyalty {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return this.balance;
  }

  function addFund() payable returns (uint) {
    return this.balance;
  }

  function pay() {
    msg.sender.transfer(0.1 ether);
  }
}
