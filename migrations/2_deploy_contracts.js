var StandardToken = artifacts.require("StandardToken");
var Ownable = artifacts.require("Ownable");
var Token = artifacts.require("Token");
var Controller = artifacts.require("Controller");
var Operator = artifacts.require("Operator");
var Attribute = artifacts.require("Attribute");
var Attributes = artifacts.require("Attributes");
var IRegistry = artifacts.require("IRegistry");
var Registry = artifacts.require("Registry");


module.exports = function(deployer) {
	return deployer.then(function(){
		return deployer.deploy(Ownable);
    }).then(function(){
      return deployer.deploy(StandardToken);
    }).then(function(){
      return deployer.deploy(Operator);
    }).then(function(){
      return deployer.deploy(Attributes);
    }).then(function(){
      return deployer.deploy(Attribute);
    }).then(function(){
      return deployer.deploy(Registry);
  	}).then(function() {
      return deployer.deploy(Controller, [Registry.address], 1);
    }).then(function(){
      return deployer.deploy(Token, Controller.address);
    })
};