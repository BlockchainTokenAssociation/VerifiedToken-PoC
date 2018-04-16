var StandardToken = artifacts.require("StandardToken");
var Ownable = artifacts.require("Ownable");
var VTToken = artifacts.require("VerifiedToken");
var VTController = artifacts.require("VerifiedTokenController");
var VTRegistry = artifacts.require("VerifiedTokenRegistry");


module.exports = function(deployer) {
	return deployer.then(function(){
		return deployer.deploy(Ownable);
    }).then(function(){
        return deployer.deploy(StandardToken);
    }).then(function(){
        return deployer.deploy(VTRegistry);
	}).then(function() {
        return deployer.deploy(VTController, [VTRegistry.address], 1);
    }).then(function(){
        return deployer.deploy(VTToken, VTController.address);
    })
};