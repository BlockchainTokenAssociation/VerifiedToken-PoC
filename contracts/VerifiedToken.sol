pragma solidity ^0.4.21;

import "./../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "./Accreditable.sol";

contract VerifiedToken is Accreditable, StandardToken {
    /// Number of confirmations required
    uint256 confirmations_;

    function VerifiedToken(uint256 _confirmations, VerifiedTokenRegistry[] _registrars) {
        confirmations_ = _confirmations;
        registrars_ = _registrars;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(isAccredited(_from, _to));
        super.transferFrom(_from, _to, _value);
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(isAccredited(msg.sender, _to));
        super.transfer(_to, _value);
    }

}
