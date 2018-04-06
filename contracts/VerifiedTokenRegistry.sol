pragma solidity ^0.4.21;

import "./../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./../node_modules/zeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract VerifiedTokenRegistry is Ownable {

    ERC20 token;
    mapping(address => mapping(address => bool)) public registry;

    event RegistryAdded(
        address token,
        address indexed registry,
        uint updatedAt);

    event RegistryRemoved(
        address token,
        address indexed registry,
        uint updatedAt);

    modifier onlyRegistry() {
        require(registry[token][msg.sender]);
        _;
    }

    function VerifiedTokenRegistry(ERC20 _token) public {
        token = _token;
    }

    function addRegistry(address _registry) public onlyOwner {
        registry[token][_registry] = true;
        emit RegistryAdded(token, _registry, now);
    }

    function removeRegistry(address _registry) public onlyOwner {
        delete registry[token][_registry];
        emit RegistryRemoved(token, _registry, now);
    }
}