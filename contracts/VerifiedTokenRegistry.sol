/**
 * Created on 2018-04-10 12:00
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

    /**
     * @dev: Mapping of registries available for the given token.
     * @dev: token contract address => registry address => boolean
     */
    mapping(address => mapping(address => bool)) public registry;

    /**
     * @dev: token contract address => array of registries for that token
     * @notice: Array of all available registries for the given token to iterate through them
     *          while checking how many registries have accredited for the given address.
     */
    mapping(address => address[]) public registries;

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

    modifier onlyRegistry(ERC20 _token) {
        require(registry[_token][msg.sender]);
        _;
    }

    /**
     * @dev: Adding registry to the list
     * @param _registry - address of the registry to add
     * @param _token - address of Verified Token
     */
    function addRegistry(ERC20 _token, address _registry) public onlyOwner {
        registry[_token][_registry] = true;
        registries[_token].push(_registry);
        registriesIndex[_registry] = registries[_token].length.sub(1);
        emit RegistryAdded(token, _registry, now);
    }

    /**
     * @dev: Removing registry from the list
     * @dev: Beside of removing the registry by itself,
     * @dev: it also reorganize the array of registries.
     * @param _registry - address of the registry to remove
     * @param _token - address of Verified Token
     */
    function removeRegistry(ERC20 _token, address _registry) public onlyOwner {
        require(registry[_token][_registry]);

        uint256 registryIndex = registriesIndex[_registry];
        uint256 lastRegistriesIndex = registries[_token].length.sub(1);
        address lastRegistry = registries[_token][lastRegistriesIndex];

        registries[_token][registryIndex] = lastRegistry;
        registries[_token][lastRegistriesIndex] = 0;
        registries[_token].length--;
        registriesIndex[_registry] = 0;
        delete registry[_token][_registry];

        emit RegistryRemoved(_token, _registry, now);
    }

    /**
     * @dev: Returning the list of current registries
     * @param _token - address of Verified Token
     */
    function getRegistries(ERC20 _token) internal view returns(address[]) {
        return registries[_token];
    }
}