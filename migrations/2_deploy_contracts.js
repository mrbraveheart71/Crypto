//const ConvertLib = artifacts.require("ConvertLib");
const Guinea = artifacts.require("Guinea");

module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  deployer.deploy(Guinea);
  //deployer.link(ConvertLib,NewCoin);
};
