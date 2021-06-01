/*
    SPDX-License-Identifier: MIT
 * Copyright © 2020 NewCoin. ALL RIGHTS RESERVED.
 */

pragma solidity ^0.8.4;

import "./Imports.sol";

contract NewCoin is Context, IERC20, Ownable {
    using SafeMath for uint256;
    using Address for address;

    //uint256 private constant MAX = ~uint256(0);
    // Share owned is % of MAX
    mapping (address => uint256) private _coinShareOwned;
    mapping (address => mapping (address => uint256)) private _allowances;
    
    // We start with 1000 coins
    uint256 private _coinTotal = 1000 * 10**9;
    uint256 private _noTranscations = 0;
    uint256 private constant INITCOINTTOTAL = 1000 * 10**9;
    uint256 private constant MAXCOINTOTAL = 10**9 * 10**9;
    uint256 private constant MAXOWNERSHIP = 10**20 * 10**9;
    
    string private _name = 'New Coin Finance';
    string private _symbol = 'NewCoin';
    uint8 private _decimals = 9;

    // this is used to increase _coinTotal to a max of 1bn
    uint256 private CHAINSTARTTIME = block.timestamp;
    uint256 private CHAINCURRENTTIME =  CHAINSTARTTIME;

    constructor ()  {
        _coinShareOwned[_msgSender()] = MAXOWNERSHIP;
        emit Transfer(address(0), _msgSender(), _coinTotal);
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view override returns (uint256) {
       return _coinTotal;
    }

    function tokenFromOwnerShip(uint256 coinShare) public view returns(uint256) {
        require(coinShare <= MAXOWNERSHIP, "Amount must be less than total ownership");
        uint256 tokens = coinShare.mul(_coinTotal);

        if( tokens.mod(MAXOWNERSHIP) > MAXOWNERSHIP.div(2)) {   // if else statement
            tokens = tokens.div(MAXOWNERSHIP) + 1;
        } else {
            tokens = tokens.div(MAXOWNERSHIP);
        }
        return tokens;
    }

    function ownershipFromToken(uint256 tokenAmount) public view returns(uint256) {
        require(tokenAmount <= _coinTotal, "Amount must be less than total coins");
        uint256 ownerShip = tokenAmount.mul(MAXOWNERSHIP); 
        if( ownerShip.mod(_coinTotal) > _coinTotal.div(2)) {   // if else statement
            ownerShip = ownerShip.div(_coinTotal) + 1;
        } else {
            ownerShip = ownerShip.div(_coinTotal);
        }
        return ownerShip;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return tokenFromOwnerShip(_coinShareOwned[account]);
    }

    function coinTotalRefresh() private   {
        //_coinTotal = INITCOINTTOTAL + block.timestamp - CHAINSTARTTIME;
        _coinTotal = INITCOINTTOTAL + _noTranscations * 10**9;
    }

   function _transfer(address sender, address recipient, uint256 amount) private {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(amount > 0, "Transfer amount must be greater than zero");
        _noTranscations = _noTranscations + 1;
        coinTotalRefresh();
        uint256 ownerShipToBeTransferred = ownershipFromToken(amount);
        _coinShareOwned[sender] = _coinShareOwned[sender].sub(ownerShipToBeTransferred);
        _coinShareOwned[recipient] = _coinShareOwned[recipient].add(ownerShipToBeTransferred);
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        address sender = _msgSender();
        _transfer(sender, recipient, amount);
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function _approve(address owner, address spender, uint256 amount) private {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
        return true;
    }


}