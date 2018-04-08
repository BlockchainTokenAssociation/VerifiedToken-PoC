/**
 * Created on 2018-04-08 17:29
 * @summary: 
 * @author: tikonoff
 */
pragma solidity ^0.4.21;

import "./Accreditable.sol";
import "./../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "./../node_modules/zeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";


/**
 * @title: 
 */
contract VerifiedToken is StandardToken, Accreditable, SafeERC20 {

/**
 * @dev: 
 * @param _from
 * @param _to
 * @param _value
 */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(isAccredited(_to));
        super.transferFrom(_from, _to, _value);
    }

/**
 * @dev: 
 * @param _to
 * @param _value
 */
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(isAccredited(_to));
        super.transfer(_to, _value);
    }

}
