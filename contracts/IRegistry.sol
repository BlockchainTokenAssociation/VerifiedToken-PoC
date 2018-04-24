pragma solidity ^0.4.23;


contract IRegistry {
  /*
   * @dev: [receiver address => [key => value]]
   * @dev: Example:
   * @dev: 0x12.. => ["type" => "exchange"]
   * @dev: 0x12.. => ["age group" => "20-30"]
   */
  mapping(address => mapping(bytes32 => bytes32)) public record;

  struct pairs {
    bytes32 key;
    bytes32 value;
  }

  /*
   *  @dev: keys used by registry (in records).
   *  @dev: Array of keys is needed to iterate through them, and mapping is used to
   *  @dev: decrease the gas of checking whether the new key is need to be added to array or not.
   */
  bytes32[] public keys;

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
