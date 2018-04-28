pragma solidity ^0.4.0;

import './../Operator.sol';

contract OperatorMock is Operator {
    function testOnlyOperator() public view onlyOperator returns(bool) {
        return true;
    }
}
