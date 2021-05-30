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

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await ReflectInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await ReflectInstance.balanceOf.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await ReflectInstance.transfer(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await ReflectInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await ReflectInstance.balanceOf.call(accountTwo)).toNumber();
    console.log((await ReflectInstance.isExcluded.call(accountOne)).toNumber())
    console.log(accountOneEndingBalance)
    console.log((await ReflectInstance.isExcluded.call(accountTwo)).toNumber())
    console.log(accountTwoEndingBalance)

    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
