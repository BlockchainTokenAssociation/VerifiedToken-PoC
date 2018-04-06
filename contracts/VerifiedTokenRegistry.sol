pragma solidity ^0.4.21;

import "./../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./../node_modules/zeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract VerifiedTokenRegistry is Ownable {

    ERC20 token;
    mapping(address => mapping(address => bool)) public registry;

    event RegistryAdded(
        address indexed token,
        address indexed registry,
        uint indexed updatedAt);

    event RegistryRemoved(
        address indexed token,
        address indexed registry,
        uint indexed removedAt);

    modifier onlyRegistry() {
        require(registry[this][msg.sender]);
        _;
    }

    function VerifiedTokenRegistry(ERC20 _token) public {
        registry[this][_token] = true;
    }

    function addRegistry(address _registry) public onlyOwner {
        registry[this][_registry] = true;
        emit RegistryAdded(this, _registry, now);
    }

    function removeRegistry(address subject) public onlyOwner {
        delete registry[msg.sender][subject];
        emit RegistryRemoved(msg.sender, subject, now);
    }
}
