pragma solidity ^0.4.21;

/// @title: VerifiedTokenController
/// @summary: Verification management for token owner
/// @summary: Set initial number of confirmations required for each/any type of registry, adding or removing one.
/// Created on 2018-04-10 12:00
/// @author: Blockchain Labs, NZ

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./VerifiedTokenRegistry.sol";


contract VerifiedTokenController is Ownable {

    /*
     * @notice: authorities that trusted by token issuer
     */
    VerifiedTokenRegistry[] public registries;

    /*
     * @dev: if zero, no checks will be performed
     */
    uint256 private confirmationsRequired;

    struct pairs {
        bytes32 key;
        bytes32 value;
    }

    pairs[] public informationRequired;

    event RequiredConfirmationsUpdated(
        uint256 confirmations,
        uint updatedAt);

    event RequiredDataUpdated(
        bytes32 indexed key,
        bytes32 indexed value,
        uint updatedAt);

    event AcceptedRegistriesUpdated(
        VerifiedTokenRegistry[] registries,
        uint updatedAt);

    /*
     * @dev: Constructor
     * @dev: Contract owner must set up registry(ies) to use
     */
    function VerifiedTokenController(VerifiedTokenRegistry[] _registries, uint256 _confirmationsRequired) public {
        confirmationsRequired = _confirmationsRequired;
        updateRegistries(_registries);
    }

    /*
     * @notice: Owner can add, delete or update the number of confirmations required for each registry
     */
    function updateRegistries(VerifiedTokenRegistry[] _registries) {
        for (uint256 i = 0; i < _registries.length; i++) {
            require(isContract(_registries[i]) && _registries[i] != address(0x0));
            registries.push(_registries[i]);
        }
        emit AcceptedRegistriesUpdated(_registries, now);
    }

    /*
     * @notice: Owner can add, delete or update the number of confirmations required for each registry
     */
    function updateRequiredConfirmations(uint256 _confirmationsRequired) {
        confirmationsRequired = _confirmationsRequired;
        emit RequiredConfirmationsUpdated(_confirmationsRequired, now);
    }


    /*
     * @notice: Owner can add, delete or update key=>values required to grant authorisation
     */
    function updateRequiredData(bytes32[] _keys, bytes32[] _values) public onlyOwner {
        uint256 pairsNumber = _keys.length;
        require( pairsNumber == _values.length);
        pairs memory newPair;

        for (uint256 i = 0; i < pairsNumber; i++) {
            newPair.key = _keys[i];
            newPair.value =_values[i];
            informationRequired.push(newPair);
            emit RequiredDataUpdated(_keys[i], _values[i], now);
        }
    }

    /*
     * @dev: checks if each key=>value pair exist in the required number of registries
     */
    function isVerified(address _receiver) public view returns(bool) {
        if(confirmationsRequired == 0)
            return true;
        uint256 pairConfirmations;
        uint256 confirmations;
        pairs memory currentPair;
        uint256 pairsToConfirm = informationRequired.length;
        VerifiedTokenRegistry registry;

        for(uint256 i = 0; i < registries.length; i++) {
            registry = VerifiedTokenRegistry(registries[i]);
            for(uint256 j = 0; j < pairsToConfirm; j++) {
                currentPair = informationRequired[j];
                if(registry.findAddress(_receiver, currentPair.key, currentPair.value))
                    pairConfirmations++;
            }
            if (pairConfirmations >= pairsToConfirm) { confirmations++; }
            if (confirmations >= confirmationsRequired) { return true; }
        }
        return false;
    }

    function isContract(address addr) public view returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

}