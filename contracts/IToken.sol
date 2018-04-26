pragma solidity ^0.4.23;

import "./IController.sol";


contract IToken {

  event ControllerChanged (
    IController controller,
    uint updatedAt
  );

  function getController() public view returns (address);
  function changeController(IController _controller) public returns (address);
}
