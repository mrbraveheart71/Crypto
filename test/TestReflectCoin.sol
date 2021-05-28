pragma solidity ^0.8.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Reflect.sol";

contract TestReflectCoin {

  function testInitialBalanceUsingDeployedContract() public {
    REFLECT reflect = REFLECT(DeployedAddresses.REFLECT());

    uint expected = 100;

    Assert.equal(reflect.balanceOf(tx.origin), expected, "Owner should have 100 Reflect initially");
  }

  function testInitialBalanceWithNewReflectCoin() public {
    REFLECT reflect = new REFLECT();

    uint256 expected = 100000000000;

    Assert.equal(reflect.balanceOf(tx.origin), expected, "Owner should have 100 Reflect initially");
  }

}
