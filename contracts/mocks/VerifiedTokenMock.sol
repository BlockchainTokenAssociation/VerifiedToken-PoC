pragma solidity ^0.4.0;

import './../VerifiedToken.sol';

contract VerifiedTokenMock is VerifiedToken {
    function giveMeCoins(address _address, uint256 _amount) public {
        balances[_address] = _amount;
    }
}
