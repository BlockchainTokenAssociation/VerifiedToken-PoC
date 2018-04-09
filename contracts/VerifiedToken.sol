/**
 * Created on 2018-04-10 12:00
 * @author: Blockchain Labs, NZ
 */
pragma solidity ^0.4.21;

import "./Accreditable.sol";
import "./../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "./../node_modules/zeppelin-solidity/contracts/token/ERC20/ERC20.sol";


/**
 * @title: VerifiedToken
 * @summary: Implementation of transfer() and transferFrom() that checks if the _to address
 * is accredited by exact number of registries that is required by the owner of token contract
 */
contract VerifiedToken is StandardToken, Accreditable {
/**
 * @dev: It calls standard transferFrom() function after checking if the transfer is allowed.
 * @param _from - address of sender
 * @param _to  - address of recipient
 * @param _value - the amount to transfer
  */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(isAccredited(_to));
        super.transferFrom(_from, _to, _value);
    }

/**
 * @dev: It calls standard transfer() function after checking if the transfer is allowed.
 * @param _to  - address of recipient
 * @param _value - the amount to transfer
 */
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(isAccredited(_to));
        super.transfer(_to, _value);
    }

}
