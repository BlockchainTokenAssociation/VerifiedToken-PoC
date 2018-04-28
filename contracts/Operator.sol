pragma solidity ^0.4.23;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract Operator is Ownable {
  mapping(address => bool) private operators;

  event OperatorStatusUpdated(
    address indexed operator,
    bool indexed status,
    uint updatedAt
  );

  modifier onlyOperator() {
    require(isOperator(msg.sender));
    _;
  }

  function updateOperator(address _operator, bool _status) public onlyOwner {
    operators[_operator] = _status;
    emit OperatorStatusUpdated(_operator, _status, now);
  }

  function isOperator(address _address) public view returns (bool) {
    return operators[_address];
  }
}
