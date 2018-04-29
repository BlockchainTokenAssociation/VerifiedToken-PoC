pragma solidity ^0.4.23;


contract Attributes {
  /*
   * @dev: Every registry should have these specific registry attributes:
   */
  bytes32 public constant REGISTRY_TYPE = "registry.type";            // e.g.: Exchange, Government, Portal, ...
  bytes32 public constant VERIFICATION_TYPE = "verification.type";    // e.g.: KYC, Deposit, MinimumAmount, ...
}