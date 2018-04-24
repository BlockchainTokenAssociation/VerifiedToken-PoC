var StandardToken = artifacts.require("StandardToken");
var Ownable = artifacts.require("Ownable");
var Token = artifacts.require("Token");
var Controller = artifacts.require("Controller");
var IRegistry = artifacts.require("IRegistry");
var Registry = artifacts.require("Registry");


module.exports = function(deployer) {
	return deployer.then(function(){
		return deployer.deploy(Ownable);
    }).then(function(){
      return deployer.deploy(StandardToken);
    }).then(function(){
      return deployer.deploy(Registry);
  	}).then(function() {
      return deployer.deploy(Controller, [Registry.address], 1);
    }).then(function(){
      return deployer.deploy(Token, Controller.address);
    })
};