pragma solidity ^0.4.21;

import "./VerifiedTokenRegistry.sol";

contract Accreditable is Ownable, VerifiedTokenRegistry {

    uint256 private confirmationsRequired_;
    VerifiedTokenRegistry[] registrars_;

    function Accreditable(uint256 _confirmationsRequired, VerifiedTokenRegistry[] _registrars) public {
        confirmationsRequired_ = _confirmationsRequired;
        registrars_ = _registrars;
    }

    function setConfirmationsRequired(uint256 _confirmationsRequired) public onlyOwner {
        confirmationsRequired_ = _confirmationsRequired;
    }


    function addAccreditation(address issuer, address subject) public onlyRegistry returns(bool) {
    }

    function withdrawAccreditation(address issuer, address subject) public onlyRegistry returns(bool) {
    }

    function isAccredited(address issuer, address subject) public view returns(bool) {
        return registry[issuer][subject];
    }
}
