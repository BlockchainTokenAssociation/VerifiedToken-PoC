pragma solidity ^0.4.23;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract VerifiedTokenRegistryInterface is Ownable {

    struct pairs {
        bytes32 key;
        bytes32 value;
    }

    /*
     * @dev: [receiver address => [key => value]]
     * @dev: Example:
     * @dev: 0x12.. => ["type" => "exchange"]
     * @dev: 0x12.. => ["age group" => "20-30"]
     */
    mapping(address => mapping(bytes32 => bytes32)) private record;

    /*
     *  @dev: keys used by registry (in records).
     *  @dev: Array of keys is needed to iterate through them, and mapping is used to
     *  @dev: decrease the gas of checking whether the new key is need to be added to array or not.
     */
    bytes32[] public keys;

    event RecordUpdated(
        address indexed registry,
        address indexed receiver,
        bytes32 key,
        bytes32 value,
        uint updatedAt);

    event AddressDeleted(
        address indexed registry,
        address indexed receiver,
        uint updatedAt);

    function updateRecord(address _receiver, bytes32 _key, bytes32 _value) public onlyOwner;
    function deleteAddress(address _receiver) public onlyOwner;
    function findAddress(address _receiver, bytes32 _key, bytes32 _value) public view returns(bool);

}
