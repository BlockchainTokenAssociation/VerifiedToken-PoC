pragma solidity ^0.4.21;

import "./../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

contract VerifiedTokenRegistry is Ownable {

    mapping(address => mapping(address => bool)) public registry;

    event EventRegistryAdded(
        address indexed issuer,
        address indexed registry,
        uint updatedAt);

    event RegistryRemoved(
        address indexed issuer,
        address indexed registry,
        uint removedAt);

    function addRegistry(address subject) public onlyOwner {
        registry[msg.sender][subject] = true;
        emit RegistryAdded(msg.sender, subject, now);
    }

    function isAccredited(address issuer, address subject) public views onlyOwner returns(bool) {
        return registry[issuer][subject];
    }

    function removeRegistry(address issuer, address subject) public onlyOwner {
        require(msg.sender == issuer || msg.sender == subject);
        delete registry[issuer][subject];
        emit RegistryRemoved(msg.sender, subject, now);
    }
}
