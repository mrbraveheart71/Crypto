const Reflect = artifacts.require("REFLECT");

contract('Reflect', (accounts) => {
  it('should put 10000 Reflect in the first account', async () => {
    const ReflectInstance = await Reflect.deployed();
    const balance = await ReflectInstance.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf(), 100000000000, "10000 wasn't in the first account");
  });
});
