pragma solidity ^0.4.24;

import "./IRegistry.sol";


contract IController {
  event RequiredConfirmationsUpdated(
    uint256 confirmations,
    uint updatedAt
  );

  event ReceiverRequirementsUpdated(
    bytes32 indexed key,
    bytes32 indexed value,
    uint updatedAt
  );

  event SenderRequirementsUpdated(
    bytes32 indexed key,
    bytes32 indexed value,
    uint updatedAt
  );

  event AcceptedRegistriesUpdated(
    IRegistry[] registries,
    uint updatedAt
  );

  function getRegistries() public view returns (IRegistry[]);
  function getNumberOfConfirmationsRequired() public view returns (uint);
  function getReceiverRequirements() public view returns (bytes32[], bytes32[]);
  function getSenderRequirements() public view returns (bytes32[], bytes32[]);

  function updateRegistries(IRegistry[] _registries) public;
  function updateRequiredConfirmations(uint256 _confirmationsRequired) public;
  function updateReceiverRequirements(bytes32[] _keys, bytes32[] _values) public;
  function updateSenderRequirements(bytes32[] _keys, bytes32[] _values) public;

  function isTransferAllowed(address _receiver, address _sender) public view returns(bool);
}