pragma solidity ^0.4.22;

import './../VerifiedTokenRegistry.sol';

contract VerifiedTokenRegistryMock is VerifiedTokenRegistry {

//    function VerifiedTokenMock(VerifiedTokenRegistry _controller) VerifiedToken(_controller) {}

    function testAddNewKey(bytes32 _key) public returns(bool) {
        return(addNewKey(_key));
    }
}
