// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AppleToken is ERC20 {
    struct Offer {
        uint256 uid;
        address sender;
        uint256 price;
        uint256 amount;
        bool is_sold;
    }

    Offer[] public offers;

    constructor() ERC20("Apple", "APL") {}

    function Mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }

    modifier validateAllowance(uint256 amount) {
        require(allowance(msg.sender, address(this)) >= amount);
        _;
    }

    function sale(uint256 price, uint256 amount)
        public
        validateAllowance(amount)
    {
        offers.push(Offer(offers.length, msg.sender, price, amount, false));
    }

    function buy(uint256 uid) public payable {
        require(!offers[uid].is_sold);
        require(msg.value >= offers[uid].price);
        _transfer(offers[uid].sender, msg.sender, offers[uid].amount);
        payable(offers[uid].sender).transfer(msg.value);
    }
}
