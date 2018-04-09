/**
 * Created on 2018-04-08 17:28
 * @author: Blockchain Labs, NZ
 */
pragma solidity ^0.4.21;

import "./../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./../node_modules/zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "./../node_modules/zeppelin-solidity/contracts/math/SafeMath.sol";


/**
 * @title: VerifiedTokenRegistry
 * @summary: Registries management contract
 */
contract VerifiedTokenRegistry is Ownable {
    using SafeMath for uint256;

    ERC20 public token;

    // Mapping of registries available for the given token
    mapping(address => mapping(address => bool)) public registry;

    // Array of all available registries to iterate through them when checking how many registries
    // have accredited the given address.
    address[] public registries;

    // Mapping from registry id to position in the registries array
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
 * @dev: Constructor is used to link all registries to some token.
 * @param _token - address of the VerifiedToken
 */
    function VerifiedTokenRegistry(ERC20 _token) public {
        token = _token;
    }

/**
 * @dev: Adding registry to the list
 * @param _registry - address of the registry to add
 */
    function addRegistry(address _registry) public onlyOwner {
        registry[token][_registry] = true;
        registries.push(_registry);
        registriesIndex[_registry] = registries.length.sub(1);
        emit RegistryAdded(token, _registry, now);
    }

/**
 * @dev: Removing registry from the list
 * @dev: Beside of removing the registry by itself,
 * @dev: it also reorganize the array of registries.
 * @param _registry - address of the registry to remove
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

    /**
     * @dev: Returning the list of current registries
     */
    function getRegistries() internal view returns(address[]) {
        return registries;
    }
}