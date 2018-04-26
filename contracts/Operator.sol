pragma solidity ^0.4.23;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract Operator is Ownable {
  mapping(address => bool) private operators;

  event OperatorAdded(
    address indexed operator,
    uint updatedAt
  );

  event OperatorRemoved(
    address indexed operator,
    uint updatedAt
  );

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
