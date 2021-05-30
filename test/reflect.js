const Reflect = artifacts.require("REFLECT");

contract('Reflect', (accounts) => {
  it('should put 100000000000 Reflect in the first account', async () => {
    const ReflectInstance = await Reflect.deployed();
    const balance = await ReflectInstance.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf(), 100000000000, "10000 wasn't in the first account");
  });
  it('should send coin correctly', async () => {
    const ReflectInstance = await Reflect.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];
    const accountThree = accounts[2];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await ReflectInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await ReflectInstance.balanceOf.call(accountTwo)).toNumber();
    const accountThreeStartingBalance = (await ReflectInstance.balanceOf.call(accountThree)).toNumber();

    // Make transaction from first account to second and third 25 each
    await ReflectInstance.transfer(accountTwo, 25 * 10**9, { from: accountOne });
    await ReflectInstance.transfer(accountThree, 25 * 10**9, { from: accountOne });

    // Make transaction from second account to third, back and forth, 10
    var i;
    for (i = 0; i < 50; i++) {
      await ReflectInstance.transfer(accountThree, 10* 10**9, { from: accountTwo });
      await ReflectInstance.transfer(accountTwo, 10 * 10**9, { from: accountThree });
    }
    
    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await ReflectInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await ReflectInstance.balanceOf.call(accountTwo)).toNumber();
    const accountThreeEndingBalance = (await ReflectInstance.balanceOf.call(accountThree)).toNumber();

    //console.log((await ReflectInstance.isExcluded.call(accountOne)))
    console.log(accountOneEndingBalance/(10**9))
    //console.log((await ReflectInstance.isExcluded.call(accountTwo)))
    console.log(accountTwoEndingBalance/(10**9))
    console.log(accountThreeEndingBalance/(10**9))
    
    // Total Supply
    console.log("Total Supply:")
    console.log((await ReflectInstance.totalSupply.call()).toNumber()) 

    //assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    //assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
