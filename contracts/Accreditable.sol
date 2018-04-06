pragma solidity ^0.4.21;

import "./VerifiedTokenRegistry.sol";

contract Accreditable is Ownable, VerifiedTokenRegistry {

    uint256 private confirmationsRequired;

    function Accreditable(uint256 _confirmationsRequired) public {
        confirmationsRequired = _confirmationsRequired;
    }

    function setConfirmationsRequired(uint256 _confirmationsRequired) public onlyOwner {
        confirmationsRequired = _confirmationsRequired;
    }

    function addAccreditation(address issuer, address subject) public onlyRegistry returns(bool) {
    }

    function withdrawAccreditation(address issuer, address subject) public onlyRegistry returns(bool) {
    }

    function isAccredited(address issuer, address subject) public view returns(bool) {
        return registry[issuer][subject];
    }
}
