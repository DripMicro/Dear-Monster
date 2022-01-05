//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./DearMonster.sol";

contract DearMonsterTrading is Ownable {
    using SafeMath for uint256;
    using Strings for uint256;

    DearMonster dearMonster;
    IERC20 DMS;

    address adminAddress;

    mapping(address => uint256) public availableTokens;
    mapping(uint256 => uint256) public tokenPrices;
    mapping(uint256 => address) public tokenOwners;

    constructor(address _nftAddress, address _tokenAddress, address _adminAddress) { 
        setDearMonsterAddress(_nftAddress);
        setDMSAddress(_tokenAddress);
        setAdminAddress(_adminAddress);
    }

    function putTrade(uint256 _tokenId, uint256 _price) public {
        availableTokens[msg.sender] = _tokenId;
        tokenOwners[_tokenId] = msg.sender;
        tokenPrices[_tokenId] = _price;
        dearMonster.transferFrom(msg.sender, address(this), _tokenId);
        dearMonster.setEnergy(_tokenId, 0);
    }

    function buyTrade(uint256 _tokenId, uint256 _amount) public {
        require(_amount >= tokenPrices[_tokenId], "The token you sent is not enough to buy this Monster");
        uint256 sellerProfit = _amount.mul(95).div(100);
        uint256 adminProfit = _amount.sub(sellerProfit);
        DMS.transferFrom(msg.sender, tokenOwners[_tokenId], sellerProfit);
        DMS.transferFrom(msg.sender, adminAddress, adminProfit);
        dearMonster.transferFrom(tokenOwners[_tokenId], msg.sender, _tokenId);
        dearMonster.setEnergy(_tokenId, 0);
    }

    function removeTrade(uint256 _tokenId) public {
        require(availableTokens[msg.sender] == _tokenId, "You have not this Monster on Trading");
        availableTokens[msg.sender] = 0;
        tokenPrices[_tokenId] = 0;
        tokenOwners[_tokenId] = address(0);
        dearMonster.setEnergy(_tokenId, 0);
    }

    function setDearMonsterAddress(address _contractAddress) public {
        dearMonster = DearMonster(_contractAddress);
    }

    function setDMSAddress(address _contractAddress) public {
        DMS = IERC20(_contractAddress);
    }

    function setAdminAddress(address _address) public {
        adminAddress = _address;
    }

}
