/**
 * Created on 2018-04-08 17:28
 * @summary: 
 * @author: tikonoff
 */
pragma solidity ^0.4.21;

import "./../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./../node_modules/zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "./../node_modules/zeppelin-solidity/contracts/math/SafeMath.sol";


/**
 * @title: 
 */
contract VerifiedTokenRegistry is Ownable {
    using SafeMath for uint256;

    ERC20 token;
    mapping(address => mapping(address => bool)) public registry;
    address[] public registries;
    // Mapping from registry id to position in the registrars array
    mapping(address => uint256) internal registriesIndex;

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

/**
 * @dev: 
 * @param _token
 */
    function VerifiedTokenRegistry(ERC20 _token) public {
        token = _token;
    }

/**
 * @dev: 
 * @param _registry
 */
    function addRegistry(address _registry) public onlyOwner {
        registry[token][_registry] = true;
        registries.push(_registry);
        registriesIndex[_registry] = registries.length.sub(1);
        emit RegistryAdded(token, _registry, now);
    }

/**
 * @dev: 
 * @param _registry
 */
    function removeRegistry(address _registry) public onlyOwner {
        require(registry[token][_registry]);

        uint256 registryIndex = registriesIndex[_registry];
        uint256 lastRegistriesIndex = registries.length.sub(1);
        address lastRegistry = registries[lastRegistriesIndex];

        registries[registryIndex] = lastRegistry;
        registries[lastRegistriesIndex] = 0;
        registries.length--;
        registriesIndex[_registry] = 0;
        delete registry[token][_registry];

        emit RegistryRemoved(token, _registry, now);
    }

    function getRegistries() internal view returns(address[]) {
        return registries;
    }
}