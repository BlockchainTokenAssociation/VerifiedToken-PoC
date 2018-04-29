pragma solidity ^0.4.23;
/*
 * @title: Attributes
 * Attributes supposed for Registry to define the Registry type
 * and describe processes of verification used by this registry.
 * Created on 2018-04-26, by Blockchain Labs, NZ
 */


contract Attributes {
  /*
   * @dev: Every registry should have these specific registry attributes:
   */
  bytes32 public constant REGISTRY_TYPE = "registry.type";            // e.g.: Exchange, Government, Portal, ...
  bytes32 public constant VERIFICATION_TYPE = "verification.type";    // e.g.: KYC, Deposit, MinimumAmount, ...
}