// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AppleToken is ERC20 {
    mapping(address => uint256) eth_balance;
    address private sender;
    uint256 private price = 0.2 ether;

    constructor() ERC20("Apple", "APL") {
        sender = msg.sender;
        _mint(sender, 100);
    }

    function Mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function getSender() public view returns (address) {
        return sender;
    }

    function getPrice() public view returns (uint256) {
        return price;
    }

    function getBalance(address account) public view returns (uint256) {
        return eth_balance[account];
    }

    function TransferToken(address payable account, uint256 tokens)
        public
        payable
    {
        require(account != address(0) && msg.sender != address(0));
        require(msg.sender.balance >= tokens * price);
        _transfer(account, msg.sender, tokens);
        eth_balance[msg.sender] += tokens * price;
    }
}
