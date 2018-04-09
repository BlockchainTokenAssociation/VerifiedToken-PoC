/**
 * Created on 2018-04-10 12:00
 * @author: Blockchain Labs, NZ
 */
pragma solidity ^0.4.21;

import "./VerifiedTokenRegistry.sol";

/**
 * @title: Accreditable
 * @summary: Accreditation management required by token contract owner
 * @summary: It implements verification itself and management functions,
 * @summary: such as add, remove, set the number of accreditations required.
 */
contract Accreditable is Ownable, VerifiedTokenRegistry {
    ERC20 private token;
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

    /**
     * @dev: Constructor.
     * @notice: Contract owner should set up number of confirmations required to consider token accredited.
     * @param _confirmationsRequired
     */
    function Accreditable(uint256 _confirmationsRequired) public {
        confirmationsRequired = _confirmationsRequired;
    }

    /**
     * @notice: Owner can change the number of confirmations required.
     * @param _confirmationsRequired
     */
    function setConfirmationsRequired(uint256 _confirmationsRequired) public onlyOwner {
        confirmationsRequired = _confirmationsRequired;
    }

    /**
     * @notice: Registry can add new address to the list of accredited recipients.
     * @param _registry
     * @param _subject
     */
    function addAccreditation(address _registry, address _subject) public onlyRegistry(token) {
        accreditation[_registry][_subject] = true;
        emit Accredited(_registry, _subject, now);
    }

    /**
     * @notice: Reqistry can withdraw the accreditation from the given address.
     * @param _registry
     * @param _subject
     */
    function withdrawAccreditation(address _registry, address _subject) public onlyRegistry(token) {
        delete registry[_registry][_subject];
        emit AccreditationWithdrawn(_registry, _subject, now);
    }

    /**
     * @notice: Anyone can check the accreditation for the chosen token and recipient.
     * @param _subject - recipient address to check
     */
    function isAccredited(address _subject) public view returns(bool) {
        return(checkAccreditation(_subject, token));
    }

    /**
     * @dev: Overloaded function to check the accreditation for explicitly given pair of token address and recipient.
     * @param _subject - recipient address
     * @param _token - token contract address
     */
    function isAccredited(address _subject, ERC20 _token) public view returns(bool) {
        return(checkAccreditation(_subject, _token));
    }

    /**
     * @dev:
     * @param _subject - recipient
     */
    function checkAccreditation(address _subject, ERC20 _token) internal view returns(bool) {
        uint256 confirmations;
        address[] memory registries;
        registries = getRegistries(_token);

        for(uint256 i=0; i < registries.length; i++) {
            if (accreditation[registries[i]][_subject]) {
                confirmations++;
                if (confirmations >= confirmationsRequired) { return true; }
            }
        }
        return false;
    }
}
