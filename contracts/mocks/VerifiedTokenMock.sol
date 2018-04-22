pragma solidity ^0.4.0;

import './../VerifiedToken.sol';

contract VerifiedTokenMock is VerifiedToken {

    constructor(VerifiedTokenController _controller) public VerifiedToken(_controller) {}

    function giveMeCoins(address _address, uint256 _amount) public {
        balances[_address] = _amount;
    }
}
