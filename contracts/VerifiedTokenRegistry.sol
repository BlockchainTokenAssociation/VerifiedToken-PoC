pragma solidity ^0.4.21;

import "./../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./../node_modules/zeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract VerifiedTokenRegistry is Ownable {

    ERC20 token;
    mapping(address => mapping(address => bool)) public registry;
    address[] public registrars;

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
        registrars.push(_registry);
        emit RegistryAdded(token, _registry, now);
    }

    function removeRegistry(address _registry) public onlyOwner {
        delete registry[token][_registry];
        /// TODO: remove registry from array
        emit RegistryRemoved(token, _registry, now);
    }

    function getRegistries() internal view returns(address[]) {
        return registrars;
    }
}