const Account = require("./../src/account.js");
const assert = require("assert");
const test = {};
exports.test = test;

test["account can be opened with zero balance"] = function(){
  let manish = new Account("manish yadav",339500965);
  assert.equal(manish.getBalance(),0);
}

test["should return increased accBalance after credit transaction"] = function(){
  let manish = new Account("manish yadav",339500965,2000);
  manish.credit(2000);
  assert.equal(manish.getBalance(),4000);
}


test["should credit only money"] = function(){
  let manish = new Account("manish yadav",339500965);
  manish.credit("balance");
  assert.equal(manish.getBalance(),0);
  manish.credit(100);
  assert.equal(manish.getBalance(),100);
}


test["should return reduced accBalance after debit transaction"] = function(){
  let manish = new Account("manish yadav",339500965,2000);
  manish.debit(1000);
  assert.equal(manish.getBalance(),1000);
}

test["money should be debited only when the amount is less than or equal to accHolder's accBal"] = function(){
  let manish = new Account("manish yadav",339500965,1000);
  manish.debit(1500);
  assert.equal(manish.getBalance(),1000);
  manish.debit(1000);
  assert.equal(manish.getBalance(),0);
}

test["should debit only money"] = function(){
  let manish = new Account("manish yadav",339500965,1000);
  manish.debit("balance");
  assert.equal(manish.getBalance(),1000);
  manish.debit(500);
  assert.equal(manish.getBalance(),500);
}


test["manish.transfer(payee,amount) transfer money from this.accHolderName to payee.accHolderName"]=function(){
  let manish = new Account("manish yadav",339500965,2000);
  let manoj = new Account("manoj yadav",339500960,5000);
  manoj.credit(2000);
  manish.credit(2000);
  manoj.transfer(manish,1000);
  assert.equal(manoj.getBalance(),6000);
  assert.equal(manish.getBalance(),5000);
  // console.log(manoj.getStatements());
  // console.log(manish.getStatements());
}


test["should transfer only money"] = function(){
  let manish = new Account("manish yadav",339500965,2000);
  let manoj = new Account("manoj yadav",339500960,5000);
  manoj.credit(2000);
  manish.credit(2000);
  manoj.transfer(manish,"balance");
  assert.equal(manoj.getBalance(),7000);
  assert.equal(manish.getBalance(),4000);
}

test["money should be transfered only when amount is less than or equal to payer accBal"] = function(){
  let manish = new Account("manish yadav",339500965,2000);
  let manoj = new Account("manoj yadav",339500960,1000);
  manoj.transfer(manish,2000);
  assert.equal(manoj.getBalance(),1000);
  assert.equal(manish.getBalance(),2000);
  manoj.transfer(manish,500);
  manish.debit(500);
  manish.credit(500);
  manish.credit(500);
  assert.equal(manish.getBalance(),3000);
  // console.log(manoj.getStatements());
  // console.log(manish.getStatements());
}

test["manish.getSummary() returns account summary"] = function(){
  let manish = new Account("manish yadav",339500965,2000);
  // console.log(manish.getSummary());
  assert.deepEqual(manish.getSummary(),
  { date: Date(),
  holderName: 'manish yadav',
  accountNumber: 339500965,
  balance: 2000 });
}

test["manish.getStatements() returns account statements"] = function(){
  let manish = new Account("manish yadav",339500965,2000);
  manish.credit(2000);
  manish.debit(1000);
  manish.credit(10000);
  // console.log(manish.getStatement());
  assert.deepEqual(manish.getStatement(),
  { date:Date(),
  holderName: 'manish yadav',
  accountNumber: 339500965,
  balance: 13000,
  listOfTransactions:
   [ { transactionType: 'credit', amount: 10000 },
     { transactionType: 'debit', amount: 1000 },
     { transactionType: 'credit', amount: 2000 } ] });
}
