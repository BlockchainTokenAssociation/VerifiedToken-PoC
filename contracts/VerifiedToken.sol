pragma solidity ^0.4.21;

import "./../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "./VerifiedTokenRegistry.sol";

/**
 * @title VerifiedERC20
 * @dev Wrappers around ERC20 operations that revert on failure.
 */
contract VerifiedToken is StandardToken, VerifiedTokenRegistry {
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(isAccredited(from, to));
        super.transferFrom(_from, _to, _value);
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(isAccredited(from, to));
        super.transfer(_to, _value);
    }
}
