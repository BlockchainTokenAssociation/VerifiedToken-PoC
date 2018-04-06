pragma solidity ^0.4.21;

import "./VerifiedTokenRegistry.sol";

contract Accreditable is Ownable, VerifiedTokenRegistry {

    uint256 private confirmationsRequired;
    mapping(address => mapping(address => bool)) accreditation;

    event Accredited(
        address indexed registry,
        address indexed subject,
        uint updatedAt);

    event AccreditationWithdrawn(
        address indexed registry,
        address indexed subject,
        uint updatedAt);

    function Accreditable(uint256 _confirmationsRequired) public {
        confirmationsRequired = _confirmationsRequired;
    }

    function setConfirmationsRequired(uint256 _confirmationsRequired) public onlyOwner {
        confirmationsRequired = _confirmationsRequired;
    }

    function addAccreditation(address _registry, address _subject) public onlyRegistry {
        accreditation[_registry][_subject] = true;
        emit Accredited(_registry, _subject, now);
    }

    function withdrawAccreditation(address _registry, address _subject) public onlyRegistry {
        delete registry[_registry][_subject];
        emit AccreditationWithdrawn(_registry, _subject, now);
    }

    function isAccredited(address _subject) public view returns(bool) {
        uint256 confirmations;
        address[] memory registrars;
        registrars = getRegistries();

        for(uint256 i=0; i < registry.length; i++) {
            if (accreditation[i][_subject]) {
                confirmations++;
                break;
            }
        }
    }
}
