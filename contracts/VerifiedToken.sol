pragma solidity ^0.4.21;

/// @title: VerifiedToken
/// @summary: Implementation of transfer() and transferFrom() that checks if the receiver
/// @summary: has enlisted in the registries required by the owner of token contract
/// @author: Blockchain Labs, NZ
/// Created on 2018-04-10 12:00

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "./VerifiedTokenController.sol";


contract VerifiedToken is StandardToken {
    VerifiedTokenController tokenController;

    /// @dev: It calls standard transferFrom() function after checking if the transfer is allowed.
    /// @param _from - address of sender
    /// @param _to  - address of recipient
    /// @param _value - the amount to transfer
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(tokenController.isVerified(_to));
        super.transferFrom(_from, _to, _value);
    }

    /// @dev: It calls standard transfer() function after checking if the transfer is allowed.
    /// @param _to  - address of recipient
    /// @param _value - the amount to transfer
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(tokenController.isVerified(_to));
        super.transfer(_to, _value);
    }

}
