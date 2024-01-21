// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.1/token/ERC20/IERC20.sol";

contract UserNFT is ERC721{
    uint256 private _nextTokenId;

    IERC20 token;

    event FundsTransferred(
        address indexed toWallet,
        address indexed fromWallet,
        uint256 indexed amount
    );

    constructor(address tokenAddr)
        ERC721("User NFT", "UNFT")
    {
         token = IERC20(tokenAddr);
    }

     /// @dev to transfer ERC20 Funds from one address to another
    function _transferFunds(
        address from,
        address to,
        uint256 amount
    ) private returns (bool) {
        uint256 value = token.balanceOf(from);
        require(value >= amount, "UserNFT: Not Enough Funds!");
        bool success;
        success = token.transferFrom(from, to, amount);
        require(success, "UserNFT: Transfer failed");
        emit FundsTransferred(from, to, amount);
        return success;
    }

    function safeMint(address to, uint256 amount) external   {
        _transferFunds(msg.sender, to, amount);
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}