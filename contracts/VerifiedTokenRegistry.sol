pragma experimental ABIEncoderV2;
pragma solidity ^0.4.21;

/// @title: VerifiedTokenRegistry
/// @summary: Registries management contract
/// Created on 2018-04-10 12:00
/// @author: Blockchain Labs, NZ

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";


contract VerifiedTokenRegistry is Ownable {
    using SafeMath for uint256;

    bool incrementEnabled;

    struct pairs {
        bytes32 key;
        bytes32 value;
    }

    /// @notice: Registry described by key=>value pairs
    /// @dev: [receiver address => [key => value]]
    /// @dev: Example:
    /// @dev: 0x12.. => ["type" => "exchange"]
    /// @dev: 0x12.. => ["age group" => "20-30"]
    mapping(address => mapping(bytes32 => bytes32)) private record;

    /// @dev: keys used by the registry (in records)
    bytes32[] public keys;

    event RecordUpdated(
        address indexed registry,
        address indexed receiver,
        bytes32 key,
        bytes32 value,
        uint updatedAt);

    event RecordDeleted(
        address indexed registry,
        address indexed receiver,
        uint updatedAt);

    /// @notice: Registry can add new address to the list
    function updateRecord(address _receiver, bytes32 _key, bytes32 _value) public onlyOwner {
        record[_receiver][_key] = _value;
        emit RecordUpdated(this, _receiver, _key, _value, now);
    }

    /// @notice: Reqistry can remove the given address from the list
    function deleteRecord(uint256 _registryId, address _receiver) public onlyOwner {
        for(uint256 i = 0; i < keys.length; i++ ) {
            delete record[_receiver][keys[i]];
        }
        emit RecordDeleted(this, _receiver, now);
    }

    /// @dev: Check if registry contains record with verifying address and pair key => value
    function findAddress(address _receiver, bytes32 _key, bytes32 _value) public view returns(bool) {
        return(record[_receiver][_key] == _value);
    }


//    /// @dev: TODO: the function should be removed while returning an array of struct is still an experimental feature
//    /// @dev: TODO: Experimental pragma instruction on the top of the page should be also removed.
//    /// @dev: It would be possible to get all pairs (array of struct) of given address... Someday...
//    function getAddressPairs(address _receiver) public view returns(pairs[]) {
//        pairs[] storage allPairs;
//        pairs memory currentPair;
//        bytes32 currentPairValue;
//
//        for(uint256 i = 0; i < keys.length; i++ ) {
//            currentPairValue = record[_receiver][keys[i]];
//            if(currentPairValue != "") {
//                currentPair.key = keys[i];
//                currentPair.value = currentPairValue;
//            }
//            allPairs.push(currentPair);
//        }
//        return(allPairs);
//    }


}