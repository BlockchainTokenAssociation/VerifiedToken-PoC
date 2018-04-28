pragma solidity ^0.4.23;

import "./IRegistry.sol";


contract IController {

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

  function getRegistries() public view returns (IRegistry[]);
  function updateRegistries(IRegistry[] _registries) public;

  function getRequiredData() public view returns (bytes32[], bytes32[]);
  function updateRequiredData(bytes32[] _keys, bytes32[] _values) public;

  function getNumberOfConfirmationsRequired() public view returns (uint);
  function updateRequiredConfirmations(uint256 _confirmationsRequired) public;

  function isVerified(address _receiver) public view returns(bool);
}