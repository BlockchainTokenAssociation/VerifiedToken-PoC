pragma solidity ^0.4.21;

/// @title: VerifiedTokenRegistry
/// @summary: Registries management contract
/// Created on 2018-04-10 12:00
/// @author: Blockchain Labs, NZ

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";


contract VerifiedTokenRegistry is Ownable {
    using SafeMath for uint256;

    uint256 private registryId;
    bool incrementEnabled;

/// @notice: Registry described by key=>value pairs
    /// @dev: record ID => key => value
    /// @dev: Example:
    /// @dev: 12 = > "registry type" => "exchange"
    /// @dev: 12 => "allowed destination" => "Antarctica"
    mapping(uint256 => mapping(bytes32 => bytes32)) private record;

    /// @notice: find registry IDs by desired key=>value pairs
    /// @dev: key => value => [ID, ID, ID, ... ]
    mapping(bytes32 => mapping(bytes32 => uint256[])) private records;

    /// @dev: record ID => receiver => true/false
    mapping(uint256 => mapping(address => bool)) public enlisted;

    event Enlisted(
        address indexed registry,
        address indexed receiver,
        uint updatedAt);

    event Delisted(
        address indexed registry,
        address indexed receiver,
        uint updatedAt);

    event RegistryCreated(
        address indexed id,
        uint updatedAt);

    event RegistryDeleted(
        address indexed id,
        uint updatedAt);

    /// @dev: zero registry ID will contain the contract address. Why not? :)
    function VerifiedTokenRegistry() public {
        registryId = uint256(this);
    }

    function createRegistry(bytes32 _key, bytes32 _value) public onlyOwner {
        require(incrementEnabled);

        incrementEnabled = false;

        registryId++;
        registry[registryId]["active"] = "true";
        updateRegistry(_key, _value, _registryId);

        incrementEnabled = true;
    }

    function updateRegistry(bytes32 _key, bytes32 _value, uint256 _id) internal {
        require(registry[_id]["active"] == "true");

        registry[_id][_key] = _value;
        uint256[] pairs = registries[_key][_value];
        registries[_key][_value] = pairs.push(_id);

        emit RegistryCreated(_id, now);
    }

    function deleteRegistry(uint256 _id) public onlyOwner {
        require(registry[_id]["active"] == "true");

        registry[_id]["active"] == "false";

        emit RegistryDeleted(_id, now);
    }

    /// @dev: Returning the list of registries containing key=>value pair
    function getRegistries(bytes32 _key, bytes32 _value) internal view returns(address[]) {
        return registries[_key][_value];
    }

    /// @notice: Registry can add new address to the list of accredited recipients.
    function enlist(uint256 _registryId, address _receiver) public onlyOwner {
        enlisted[_registryId][_receiver] = true;
        emit Enlisted(_registryId, _receiver, now);
    }

    /// @notice: Reqistry can remove the given address.
    function delist(uint256 _registryId, address _receiver) public onlyOwner {
        delete enlisted[_registryId][_receiver];
        emit Delisted(_registryId, _receiver, now);
    }

    /// @dev: Overloaded function to check the accreditation for explicitly given pair of token address and recipient.
    function isEnlisted(uint256 _registry, address _receiver, ERC20 _token) public view returns(bool) {
        return();
    }

    /// @notice: Check address availability in the specific registry
    function findInRegistry(address _registry, address _receiver) internal view returns(bool) {
        return false;
    }

    /// @dev: Check if registry for given token contains record with verifying address.
    function checkRegistry(address _registry, address _receiver, ERC20 _token) internal view returns(bool) {
        if (enlisted[registries[_registry]][_receiver]) { return true; }
        return false;
    }

    function registerToken(address _registries, address _token) {
        return false;
    }
}