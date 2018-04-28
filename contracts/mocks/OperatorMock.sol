pragma solidity ^0.4.0;

import './../Token.sol';

contract TokenMock is Token {

    constructor(IController _controller) public Token(_controller) {}

    function giveMeCoins(address _address, uint256 _amount) public {
        balances[_address] = _amount;
    }
}
