pragma solidity ^0.4.23;
/*
 * @title: Verified Token Registry
 * Receivers management contract
 * Created on 2018-04-26, by Blockchain Labs, NZ
 */
import "./interfaces/IRegistry.sol";
import "./Operator.sol";
import "./Attribute.sol";
import "./Attributes.sol";


contract Registry is IRegistry, Operator, Attribute, Attributes {
  /*
   * @dev: [receiver address => [attribute => value]]
   * @dev: Example:
   * @dev: 0x12.. => ["type" => "exchange"]
   * @dev: 0x12.. => ["age group" => "20-30"]
   */
  mapping(address => mapping(bytes32 => bytes32)) public record;

  struct pairs {
    bytes32 attribute;
    bytes32 value;
  }

  modifier onlyOperator() {
    require(isOperator(msg.sender));
    _;
  }

  /*
   * @notice: on deploying, the contract "proves" that it is a registry and add its first operator
   */
  constructor() public {
    updateOperator(msg.sender, true);
    update(this, REGISTRY_TYPE, "portal");
    update(this, VERIFICATION_TYPE, "KYC");   // What type of registry you are? Update it.
  }

  /*
   * @notice: Registry can add new addresses to the list or update existed
   */
  function update(address _receiver, bytes32 _attribute, bytes32 _value) public onlyOperator {
    record[_receiver][_attribute] = _value;
    if(!attributeExists(_attribute))
		  addAttribute(_attribute);
    emit RecordUpdated(this, _receiver, _attribute, _value, now);
  }

  /*
   * @notice: Registry can remove the given address completely
   */
  function remove(address _receiver) public onlyOperator {
    for(uint256 i = 0; i < attributes.length; i++ )
    	delete record[_receiver][attributes[i]];
    emit AddressRemoved(this, _receiver, now);
  }

  /*
   * @dev: Check if registry contains the record with verifying address and pair attribute => value
   */
  function verify(address _receiver, bytes32 _attribute, bytes32 _value) public view returns(bool) {
    return(record[_receiver][_attribute] == _value);
  }

  /*
   * @dev: returns attribute=>value pairs of given receiver
   */
  function expose(address _receiver) public view returns(bytes32[], bytes32[]) {
    uint256 maxNumberOfPairs = attributes.length;
    bytes32 currentValue;
    bytes32[] memory receiverKeys = new bytes32[](maxNumberOfPairs);
    bytes32[] memory receiverValues = new bytes32[](maxNumberOfPairs);
    uint256 iteratorOfPairsOfReceiver;

    for(uint256 i = 0; i < attributes.length; i++ ) {
      currentValue= record[_receiver][attributes[i]];
      if(currentValue != 0) {
        receiverKeys[iteratorOfPairsOfReceiver] = attributes[i];
        receiverValues[iteratorOfPairsOfReceiver] = currentValue;
        iteratorOfPairsOfReceiver++;
      }
    }

    bytes32[] memory returnKeys = new bytes32[](iteratorOfPairsOfReceiver);
    bytes32[] memory returnValues = new bytes32[](iteratorOfPairsOfReceiver);

    for(i = 0; i < iteratorOfPairsOfReceiver; i++ ) {
      returnKeys[i] = receiverKeys[i];
      returnValues[i] = receiverValues[i];
    }
    return(returnKeys, returnValues);
  }

  /*
   * @dev: check if address has an attribute
   */
  function hasAttribute(address _address, bytes32 _attribute) public view returns(bool) {
    return(record[_address][_attribute] != "");
  }
}
