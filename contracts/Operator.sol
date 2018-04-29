pragma solidity ^0.4.23;
/*
 * @title: Operator
 * Management of registry operators
 * CRUD + events
 * Created on 2018-04-26, by Blockchain Labs, NZ
 */
import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract Operator is Ownable {
	/*
   * @notice: List of operators and their status
   */
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

	/*
   * @notice: Update the operators and their status
   */
  function updateOperator(address _operator, bool _status) public onlyOwner {
    operators[_operator] = _status;
    emit OperatorStatusUpdated(_operator, _status, now);
  }

	/*
   * @notice: Check if address is listed as an operator (status == true)
   */
  function isOperator(address _address) public view returns (bool) {
    return operators[_address];
  }
}
