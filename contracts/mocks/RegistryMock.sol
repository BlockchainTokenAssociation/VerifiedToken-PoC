pragma solidity ^0.4.22;

import './../Registry.sol';

contract RegistryMock is Registry {
    function testAddNewKey(bytes32 _key) public returns(bool) {
        return(addNewKey(_key));
    }
}
