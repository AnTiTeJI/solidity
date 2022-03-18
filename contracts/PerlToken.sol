// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PerlToken is ERC721 {
    struct Token {
        string url;
        address owner;
    }

    struct Offer {
        address sender;
        uint256 id;
        uint256 price;
        uint256 tokenId;
        bool is_sold;
    }

    Offer[] private _offers;
    Token[] private _tokens;

    constructor() ERC721("PerlToken", "PRL") {}

    function mint(string memory url) public {
        _mint(msg.sender, _tokens.length);
        _tokens.push(Token(url, msg.sender));
    }

    function buy(uint256 id) public payable {
        require(msg.value >= _offers[id].price);
        require(msg.sender != _offers[id].sender);

        payable(_offers[id].sender).transfer(msg.value);
        _transfer(_offers[id].sender, msg.sender, _offers[id].tokenId);

        _tokens[_offers[id].tokenId].owner = msg.sender;
        _offers[id].is_sold = true;
    }

    function offer(uint256 tokenId, uint256 price) public {
        require(_exists(tokenId));
        require(balanceOf(msg.sender) > 0);
        require(ownerOf(tokenId) == msg.sender);

        _offers.push(
            Offer(msg.sender, _offers.length, price * 10**18, tokenId, false)
        );
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId));
        return _tokens[tokenId].url;
    }

    function offers() public returns (Offer[] memory) {
        return _offers;
    }

    function tokens() public returns (Token[] memory) {
        return _tokens;
    }
}
