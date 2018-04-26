pragma solidity ^0.4.23;


contract IRegistry {

  event AddressUpdated(
    address indexed registry,
    address indexed receiver,
    bytes32 key,
    bytes32 value,
    uint updatedAt
  );

  event AddressDeleted(
    address indexed registry,
    address indexed receiver,
    uint updatedAt
  );

  function updateAddress(address _receiver, bytes32 _key, bytes32 _value) public;
  function verifyAddress(address _receiver, bytes32 _key, bytes32 _value) public view returns(bool);
  function exposeAddress(address _receiver) public view returns(bytes32[], bytes32[]);
  function deleteAddress(address _receiver) public;
}
