pragma solidity ^0.4.22;

import './../Registry.sol';

contract RegistryMock is Registry {
    function testAddAttribute(bytes32 _attribute) public returns(bool) {
        return(addAttribute(_attribute));
    }
}
