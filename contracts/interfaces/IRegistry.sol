pragma solidity ^0.4.23;


contract IRegistry {

  event RecordUpdated(
    address indexed registry,
    address indexed receiver,
    bytes32 attribute,
    bytes32 value,
    uint updatedAt
  );

  event AddressRemoved(
    address indexed registry,
    address indexed receiver,
    uint updatedAt
  );

  function update(address _address, bytes32 _attribute, bytes32 _value) public;
  function verify(address _address, bytes32 _attribute, bytes32 _value) public view returns(bool);
  function expose(address _address) public view returns(bytes32[], bytes32[]);
  function remove(address _address) public;
	function hasAttribute(address _address, bytes32 _attribute) public view returns(bool);
}
