pragma solidity ^0.4.21;

/// @title: VerifiedTokenController
/// @summary: Verification management for token owner
/// @summary: Set initial number of confirmations required for each/any type of registry, adding or removing one.
/// Created on 2018-04-10 12:00
/// @author: Blockchain Labs, NZ

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./VerifiedTokenRegistry.sol";


contract VerifiedTokenController is Ownable {

    /// @notice: authorities that trusted by token issuer
    VerifiedTokenRegistry[] public registries;
    uint256 private confirmationsRequired;

    struct pairs {
        bytes32 key;
        bytes32 value;
    }

    pairs[] private informationRequired;

    event RequiredConfirmationsUpdated(
        bytes32 indexed key,
        bytes32 indexed value,
        uint updatedAt);

    /// @dev: Constructor
    /// @dev: Contract owner must set up registry(ies) to use
    function VerifiedTokenController(VerifiedTokenRegistry[] _registries) public {
        for (uint256 i = 0; i < _registries.length; i++) {
            registries.push(_registries[i]);
        }
    }

    /// @notice: Owner can add, delete or update the number of confirmations required for each registry
    function updateRequiredConfirmations(bytes32[] _keys, bytes32[] _values) public onlyOwner {
        uint256 pairsNumber = _keys.length;
        require( pairsNumber == _values.length);
        pairs newPair;

        for (uint256 i = 0; i < pairsNumber; i++) {
            newPair.key = _keys[i];
            newPair.value =_values[i];
            informationRequired.push(newPair);
            emit RequiredConfirmationsUpdated(_keys[i], _values[i], now);
        }
    }

    /// @dev: checks if each key=>value pair exist in the required number of registries
    function isVerified(address _receiver) public view returns(bool) {
        uint256 pairConfirmations;
        uint256 confirmations;
        pairs memory currentPair;
        uint256 pairsToConfirm = informationRequired.length;
        VerifiedTokenRegistry registry;

        for(uint256 i = 0; i < registries.length; i++) {
            registry = VerifiedTokenRegistry(registries[i]);
            for(uint256 j = 0; j < pairsToConfirm; j++) {
                currentPair = informationRequired[j];
                if(registry.checkAddress(_receiver, currentPair.key, currentPair.value))
                    pairConfirmations++;
            }
            if (pairConfirmations >= pairsToConfirm) { confirmations++; }
            if (confirmations >= confirmationsRequired) { return true; }
        }
        return false;
    }
}