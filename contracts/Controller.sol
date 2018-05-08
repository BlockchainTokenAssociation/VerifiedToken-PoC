pragma solidity ^0.4.23;
/*
 * @title: Verified Token Controller
 * Verification management for token owner
 * Setting initial number of confirmations required for each/any type of registry, adding or removing them.
 * Created on 2018-04-26, by Blockchain Labs, NZ
 */
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./interfaces/IRegistry.sol";
import "./interfaces/IController.sol";
import "./Attributes.sol";


contract Controller is IController, Attributes, Ownable {
/*
 * @notice: authorities that trusted by token issuer
 */
  IRegistry[] public registries;

	/*
   * @notice: attribute key and value are stored in 'pairs'
   */
  struct pairs {
    bytes32 attribute;
    bytes32 value;
  }

  pairs[] private receiverRequirements;
  pairs[] private senderRequirements;

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
   * @notice: Owner can add, delete or update Receiver requirements
   */
  function updateReceiverRequirements(bytes32[] _attributes, bytes32[] _values) public onlyOwner {
    uint256 pairsNumber = _attributes.length;
    require( pairsNumber == _values.length);
    pairs memory newPair;
    receiverRequirements.length = 0;

    for (uint256 i = 0; i < pairsNumber; i++) {
      newPair.attribute = _attributes[i];
      newPair.value =_values[i];
      receiverRequirements.push(newPair);
      emit ReceiverRequirementsUpdated(_attributes[i], _values[i], now);
    }
  }

  /*
   * @notice: Owner can add, delete or update Sender requirements
   */
  function updateSenderRequirements(bytes32[] _attributes, bytes32[] _values) public onlyOwner{
    uint256 pairsNumber = _attributes.length;
    require( pairsNumber == _values.length);
    pairs memory newPair;
    senderRequirements.length = 0;

    for (uint256 i = 0; i < pairsNumber; i++) {
      newPair.attribute = _attributes[i];
      newPair.value =_values[i];
      senderRequirements.push(newPair);
      emit SenderRequirementsUpdated(_attributes[i], _values[i], now);
    }
  }

  /*
   * @dev: checks if Receiver is verified
   */
  function isReceiverVerified(address _address) public view returns(bool) {
    return isVerified(_address, receiverRequirements) ? true : false;
  }

  /*
   * @dev: checks if Receiver is verified
   */
  function isSenderVerified(address _address) public view returns(bool) {
    return isVerified(_address, senderRequirements) ? true : false;
  }

  /*
   * @dev: checks if the address from appropriate requirements list has attribute=>value pair in the registry
   */
  function isVerified(address _address, pairs[] requirements) internal view returns(bool) {
    if(confirmationsRequired == 0) { return true; }
    uint256 pairConfirmations;
    uint256 confirmations;
    pairs memory currentPair;
    uint256 pairsToConfirm = requirements.length;
    IRegistry registry;

    for(uint256 i = 0; i < registries.length; i++) {
      registry = IRegistry(registries[i]);
      for(uint256 j = 0; j < pairsToConfirm; j++) {
        currentPair = requirements[j];
        if(registry.verify(_address, currentPair.attribute, currentPair.value))
          pairConfirmations++;
        }
        if (pairConfirmations >= pairsToConfirm)
          confirmations++;
        if (confirmations >= confirmationsRequired)
          return true;
      }
    return false;
  }

  /*
   * @dev: checks if an address is the contract address
   */
  function isContract(address addr) public view returns (bool) {
    uint size;
    assembly { size := extcodesize(addr) }
    return size > 0;
  }

  /*
   * @dev: return the number of confirmations required for successful transfer
   */
  function getNumberOfConfirmationsRequired() public view returns (uint) {
    return confirmationsRequired;
  }

  /*
   * @dev: return the pairs (attribute=>value) required for Receiver to transfer tokens
   */
    function getReceiverRequirements() public view returns (bytes32[], bytes32[]) {
        uint256 numberOfPairs = receiverRequirements.length;
        bytes32[] memory attributes = new bytes32[](numberOfPairs);
        bytes32[] memory values = new bytes32[](numberOfPairs);
        if (receiverRequirements.length == 0) {
          attributes[0] = "";
          values[0] = "";
        }
        else {
          for(uint i = 0; i < receiverRequirements.length; i++) {
              attributes[i] = receiverRequirements[i].attribute;
              values[i] = receiverRequirements[i].value;
          }
        }
      return (attributes, values);
    }

  /*
   * @dev: return the pairs (attribute=>value) required for Sender to transfer tokens
   */
  function getSenderRequirements() public view returns (bytes32[], bytes32[]) {
    uint256 numberOfPairs = senderRequirements.length;
    bytes32[] memory attributes = new bytes32[](numberOfPairs);
    bytes32[] memory values = new bytes32[](numberOfPairs);

    for(uint i = 0; i < senderRequirements.length; i++) {
      attributes[i] = senderRequirements[i].attribute;
      values[i] = senderRequirements[i].value;
    }
    return (attributes, values);
  }

    /*
     * @dev: return list of registries that assigned by Token Issuer to verify token transfers
     */
  function getRegistries() public view returns (IRegistry[]) {
    return registries;
  }
}