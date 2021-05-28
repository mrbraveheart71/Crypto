pragma solidity ^0.8.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Reflect.sol";

contract TestReflectCoin {

  function testInitialBalanceUsingDeployedContract() public {
    Reflect reflect = Reflect(DeployedAddresses.Reflect());

    uint expected = 100;

    Assert.equal(reflect.balanceOf(tx.origin), expected, "Owner should have 100 Reflect initially");
  }

  function testInitialBalanceWithNewReflectCoin() public {
    Reflect reflect = new Reflect();

    uint expected = 100;

    Assert.equal(reflect.balanceOf(tx.origin), expected, "Owner should have 100 Reflect initially");
  }

}
