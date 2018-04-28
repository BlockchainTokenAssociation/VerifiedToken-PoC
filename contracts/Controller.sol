pragma solidity ^0.4.23;
/*
 * @title: Verified Token Controller
 * Verification management for token owner
 * Setting initial number of confirmations required for each/any type of registry, adding or removing them.
 * Created on 2018-04-26, by Blockchain Labs, NZ
 */
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./IRegistry.sol";
import "./IController.sol";
import "./Attributes.sol";


contract Controller is IController, Attributes, Ownable {
/*
 * @notice: authorities that trusted by token issuer
 */
  IRegistry[] public registries;

  struct pairs {
    bytes32 key;
    bytes32 value;
  }

  pairs[] private informationRequired;

  /*
   * @dev: if zero, no checks will be performed
   */
  uint256 private confirmationsRequired;


  event RequiredConfirmationsUpdated(
    uint256 confirmations,
    uint updatedAt
  );

  event RequiredDataUpdated(
    bytes32 indexed key,
    bytes32 indexed value,
    uint updatedAt
  );

  event AcceptedRegistriesUpdated(
    IRegistry[] registries,
    uint updatedAt
  );

  /*
   * @dev: Contract owner must set up registry(ies) to use
   */
  constructor(IRegistry[] _registries, uint256 _confirmationsRequired) public {
    confirmationsRequired = _confirmationsRequired;
    updateRegistries(_registries);
  }

  /*
   * @notice: Owner can add, delete or update the number of confirmations required for each registry
   * @dev: adding addresses one by one is chosen, because of Solidity (for now) doesn't check
   * @dev: if the list of addresses is the list of contracts.
   */
  function updateRegistries(IRegistry[] _registries) public onlyOwner {
    IRegistry[] memory contracts = new IRegistry[](_registries.length);
    IRegistry currentRegistry;

    for (uint256 i = 0; i < _registries.length; i++) {
      currentRegistry = IRegistry(_registries[i]);
      require(isContract(currentRegistry));
      require(currentRegistry.hasAttribute(currentRegistry, REGISTRY_TYPE));
      contracts[i] = currentRegistry;
    }
    registries = contracts;
    emit AcceptedRegistriesUpdated(contracts, now);
  }

  /*
   * @notice: Owner can add, delete or update the number of confirmations required for each registry
   */
  function updateRequiredConfirmations(uint256 _confirmationsRequired) public onlyOwner {
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
    if(confirmationsRequired == 0) { return true; }
    uint256 pairConfirmations;
    uint256 confirmations;
    pairs memory currentPair;
    uint256 pairsToConfirm = informationRequired.length;
    IRegistry registry;

    for(uint256 i = 0; i < registries.length; i++) {
      registry = IRegistry(registries[i]);
      for(uint256 j = 0; j < pairsToConfirm; j++) {
        currentPair = informationRequired[j];
        if(registry.verify(_receiver, currentPair.key, currentPair.value))
          pairConfirmations++;
      }
      if (pairConfirmations >= pairsToConfirm)
        confirmations++;
      if (confirmations >= confirmationsRequired)
        return true;
    }
    return false;
  }

  function isContract(address addr) public view returns (bool) {
    uint size;
    assembly { size := extcodesize(addr) }
    return size > 0;
  }

  function getNumberOfConfirmationsRequired() public view returns (uint) {
    return confirmationsRequired;
  }

  function getRequiredData() public view returns (bytes32[], bytes32[]) {
    uint256 numberOfPairs = informationRequired.length;
    bytes32[] memory keys = new bytes32[](numberOfPairs);
    bytes32[] memory values = new bytes32[](numberOfPairs);

    for(uint i = 0; i < informationRequired.length; i++) {
      keys[i] = informationRequired[i].key;
      values[i] = informationRequired[i].value;
    }
    return (keys, values);
  }

  function getRegistries() public view returns (IRegistry[]) {
    return registries;
  }
}