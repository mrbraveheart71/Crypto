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
  it('should put 100,000 NewCoin in the first account', async () => {
    const NewCoinInstance = await NewCoin.deployed();
    console.log("Total Supply in the Beginning:");
    console.log((new BN(await NewCoinInstance.totalSupply.call()))/(denominator));
   //assert.equal(balance.valueOf(), 1000/(10**9), "1000 wasn't in the first account");
  });
  it('Now create multiple accounts and simulate transactions.', async () => {
    const NewCoinInstance = await NewCoin.deployed();

    // Setup 5 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];
    const accountThree = accounts[2];
    const accountFour = accounts[3];
    const accountFive = accounts[4];

    // Make transaction from Account one, 20K each to two and three
    // Also do an approve to account four at the very beginning
    // 18 zeros 000000000000000000
    await NewCoinInstance.approve(accountFour, "20000000000000000000000", { from: accountOne });
    await NewCoinInstance.transfer(accountTwo, "20000000000000000000000", { from: accountOne });
    await NewCoinInstance.transfer(accountThree, "20000000000000000000000", { from: accountOne });
      
    console.log("Total Supply after first set of transactions:");
    console.log((new BN(await NewCoinInstance.totalSupply.call()))/(denominator));
    console.log("Account One Balance:");
    console.log((new BN(await NewCoinInstance.balanceOf.call(accountOne)))/(denominator));
    console.log("Account Two Balance:");
    console.log((new BN(await NewCoinInstance.balanceOf.call(accountTwo)))/(denominator));
    console.log("Account Three Balance:");
    console.log((new BN(await NewCoinInstance.balanceOf.call(accountThree)))/(denominator));
    console.log("Account Four Allowance Received from Account One:");
    console.log((new BN(await NewCoinInstance.allowance.call(accountOne, accountFour)))/(denominator));
    console.log("Account Four Balance:");
    console.log((new BN(await NewCoinInstance.balanceOf.call(accountFour)))/(denominator));
    
    // Now spend the allowance that account 4 received to account 5
    await NewCoinInstance.transferFrom(accountOne, accountFive,"10000000000000000000000", { from: accountFour });

    console.log("Total Supply after second set of transactions:");
    console.log((new BN(await NewCoinInstance.totalSupply.call()))/(denominator));
    console.log("Account One Balance:");
    console.log((new BN(await NewCoinInstance.balanceOf.call(accountOne)))/(denominator));
    console.log("Account Four Allowance Received from Account One:");
    console.log((new BN(await NewCoinInstance.allowance.call(accountOne, accountFour)))/(denominator));
    console.log("Account Four Balance:");
    console.log((new BN(await NewCoinInstance.balanceOf.call(accountFour)))/(denominator));
  
    // Make transaction from second account to third, back and forth, 10
    //var i;
    //for (i = 0; i < 50; i++) {
    //  await NewCoinInstance.transfer(accountThree, "100000000000000000000", { from: accountTwo });
    //  await NewCoinInstance.transfer(accountTwo, "100000000000000000000", { from: accountThree });
    //  console.log("Total Supply:");
    //  console.log((new BN(await NewCoinInstance.totalSupply.call()))/(denominator));
    //  console.log(await NewCoinInstance.totalSupply.call());
    //}

    // Total Supply at the very End
    console.log("Total Supply after all transactions:");
    console.log((new BN(await NewCoinInstance.totalSupply.call()))/(denominator));
    //assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    //assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
