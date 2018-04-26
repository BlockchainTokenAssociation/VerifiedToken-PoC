pragma solidity ^0.4.23;


contract Operator {
  modifier onlyOperator() {
    require(isOperator(msg.sender));
    _;
  }

  function addOperator(address _operator) public onlyOwner {
    operators[_operator] = true;
    emit OperatorAdded(_operator, now);
  }

  function removeOperator(address _operator) public onlyOwner {
    operators[_operator] = false;
    emit OperatorRemoved(_operator, now);
  }

  function isOperator(address who) public view returns (bool) {
    return operators[who];
  }
}
