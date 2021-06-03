//const ConvertLib = artifacts.require("ConvertLib");
const NewCoin = artifacts.require("NewCoin");

module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  deployer.deploy(NewCoin);
  //deployer.link(ConvertLib,NewCoin);
};
