const NewCoin = artifacts.require("NewCoin");
const BN = require("bn.js");

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

contract('NewCoin', (accounts) => {
  const denominator = new BN("1000000000000000000");
  it('should put 1000 NewCoin in the first account', async () => {
    const NewCoinInstance = await NewCoin.deployed();
    console.log("Total Supply:");
    console.log((new BN(await NewCoinInstance.totalSupply.call()))/(denominator));
   //assert.equal(balance.valueOf(), 1000/(10**9), "1000 wasn't in the first account");
  });
  it('should send coin correctly', async () => {
    const NewCoinInstance = await NewCoin.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];
    const accountThree = accounts[2];

    //wait(7000);  //7 seconds in milliseconds
    // Make transaction from first account to second and third 25 each
    await NewCoinInstance.transfer(accountTwo, "250000000000000000000", { from: accountOne });
    console.log("Total Supply:");
    console.log((new BN(await NewCoinInstance.totalSupply.call()))/(denominator));
    console.log(await NewCoinInstance.totalSupply.call());

    //console.log((await ReflectInstance.isExcluded.call(accountOne)))
    //console.log((await NewCoinInstance.balanceOf.call(accountOne)).toNumber()/(10**9))
    //console.log((await ReflectInstance.isExcluded.call(accountTwo)))
    //console.log((await NewCoinInstance.balanceOf.call(accountTwo)).toNumber()/(10**9))
    //console.log((await NewCoinInstance.balanceOf.call(accountThree)).toNumber()/(10**9))
    
    await NewCoinInstance.transfer(accountThree, "250000000000000000000", { from: accountOne });

    console.log((new BN(await NewCoinInstance.balanceOf.call(accountOne)))/(denominator));
    console.log((new BN(await NewCoinInstance.balanceOf.call(accountTwo)))/(denominator));
    console.log((new BN(await NewCoinInstance.balanceOf.call(accountThree)))/(denominator));
    console.log("Total Supply:");
    console.log((new BN(await NewCoinInstance.totalSupply.call()))/(denominator));
    
     wait(7000);  //7 seconds in milliseconds
     // Make transaction from second account to third, back and forth, 10
    var i;
    for (i = 0; i < 50; i++) {
      await NewCoinInstance.transfer(accountThree, "100000000000000000000", { from: accountTwo });
      await NewCoinInstance.transfer(accountTwo, "100000000000000000000", { from: accountThree });
      console.log("Total Supply:");
      console.log((new BN(await NewCoinInstance.totalSupply.call()))/(denominator));
      console.log(await NewCoinInstance.totalSupply.call());
    }

    console.log((new BN(await NewCoinInstance.balanceOf.call(accountOne)))/(denominator));
    console.log((new BN(await NewCoinInstance.balanceOf.call(accountTwo)))/(denominator));
    console.log((new BN(await NewCoinInstance.balanceOf.call(accountThree)))/(denominator));
    
    // Total Supply
    console.log("Total Supply:");
    console.log((new BN(await NewCoinInstance.totalSupply.call()))/(denominator));

    //assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    //assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
