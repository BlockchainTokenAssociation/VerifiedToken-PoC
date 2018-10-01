pragma solidity ^0.4.24;
/*
 * @title: VTRegistry Operator
 * Registry Operators management
 * Created on 2018-04-26, by Blockchain Labs, NZ
 */
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Attribute is Ownable {
  /*
   *  @dev: attributes used by registry (in records).
   *  @dev: Array of attributes is needed to iterate through them, and mapping is used to
   *  @dev: decrease the gas of checking whether the new attribute is need to be added to array or not.
   */
  bytes32[] public attributes;

  /*
   * @dev: 'Attribute' mapping is used to keep information about available attributes
   */
  mapping(bytes32 => bool) private attribute;

  /*
   * @dev: check if attribute exists
   */
  function attributeExists(bytes32 _attribute) public view returns(bool) {
  	return(attribute[_attribute]);
  }

  /*
   * @dev: add new attribute to mapping and array
   */
  function addAttribute(bytes32 _attribute) internal onlyOwner returns(bool) {
  	attributes.push(_attribute);
  	attribute[_attribute] = true;
  }
}