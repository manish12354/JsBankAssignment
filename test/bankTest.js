const Bank = require("./../src/bank.js");
const assert = require("assert");
let test = {};
exports.test = test;

test["Bank.getBalance() should return accBalance of any given account"] = function(){
  let sbi = new Bank("stateBankOfIndia");
  sbi.createAccount("manish yadav",1000);
  // console.log(sbi);
  assert.equal(sbi.getBalance(339500965),1000);
};


test["A bank can have many accounts"] = function(){
  let sbi = new Bank("stateBankOfIndia");
  sbi.createAccount("manish yadav");
  sbi.createAccount("manoj yadav");
  assert.equal(sbi.countAccounts(),2);
};

test["should return increased accBalance after credit transaction"] = function(){
  let sbi = new Bank("sbi");
  sbi.createAccount("manish yadav");
  sbi.credit(339500965,2000);
  sbi.credit(339500965,-1000);
  assert.equal(sbi.getBalance(339500965),2000);
};

test["should return reduced accBalance after debit transaction"] = function(){
  let sbi = new Bank("sbi");
  sbi.createAccount("manish yadav",5000);
  sbi.debit(339500965,2000);
  sbi.debit(339500965,-1000);
  assert.equal(sbi.getBalance(339500965),3000);
};

test["sbi.transfer(payerAccNum,payeeAccNum,amount) should transfer money from a account to another"] = function(){
  let sbi = new Bank("stateBankOfIndia");
  sbi.createAccount("manish yadav");
  sbi.createAccount("manoj yadav");
  sbi.credit(339500965,1000);
  sbi.transfer(339500965,339500966,1000);
  assert.equal(sbi.getBalance(339500965),0);
  assert.equal(sbi.getBalance(339500966),1000);
  // console.log(sbi);
};

test["A bank can know total amount of money contained across all its accounts"] = function(){
  let sbi = new Bank("sbi");
  sbi.createAccount("manish yadav");
  sbi.credit(339500965,1000);
  // sbi[339500965].credit(1000);
  sbi.createAccount("manoj yadav");
  sbi.credit(339500966,3000);
  sbi.createAccount("shivam yadav");
  sbi.credit(339500967,3000);
  sbi.debit(339500966,1000);
  // console.log(sbi.getTotalAmount());
  assert.equal(sbi.getTotalAmount(),6000);
};


test["sbi.getSummary(accNum) should return summary of that account"] = function(){
  let sbi = new Bank("sbi");
  sbi.createAccount("manish yadav");
  sbi.credit(339500965,1000);
  assert.deepEqual(sbi.getSummary(339500965),{
    date: Date(),
    holderName:"manish yadav",
    accountNumber:339500965,
    balance:1000
  });
};


test["sbi.getStatement(accNum) should return statements of that account"] = function(){
  let sbi = new Bank("stateBankOfIndia");
  sbi.createAccount("manish yadav");
  sbi.createAccount("manoj yadav");
  sbi.credit(339500965,1000);
  sbi.transfer(339500965,339500966,1000);
  sbi.credit(339500965,1000);
  sbi.credit(339500965,500);
  sbi.debit(339500965,1000);
  // console.log(sbi.getStatement(339500965));
  assert.deepEqual(sbi.getStatement(339500965),
  {date: Date(),
    holderName: 'manish yadav',
    accountNumber: 339500965,
    balance: 500,
    listOfTransactions:
    [{ transactionType: 'debit', amount: 1000 },
    { transactionType: 'credit', amount: 500 },
    { transactionType: 'credit', amount: 1000 },
    { transactionType: 'transfer', amount: 1000, transferedTo: 339500966 },
    { transactionType: 'credit', amount: 1000 } ] })
  };


test["Look at all credit transactions above a certain amount"] = function(){
  let sbi = new Bank("sbi");
  sbi.createAccount("manish yadav");
  sbi.credit(339500965,100);
  sbi.credit(339500965,400);
  sbi.credit(339500965,300);
  sbi.debit(339500965,500);
  sbi.credit(339500965,200);
  // console.log(sbi.getAllCreditsAbove(100,339500965));
  assert.deepEqual(sbi.getAllCreditsAbove(100,339500965),
  [ { transactionType: 'credit', amount: 200 },
  { transactionType: 'credit', amount: 300 },
  { transactionType: 'credit', amount: 400 } ])
  assert.deepEqual(sbi.getAllCreditsAbove(500,339500965),[])
};

test["Look at all debit transactions above a certain amount"] = function(){
  let sbi = new Bank("sbi");
  sbi.createAccount("manish yadav",10000);
  sbi.debit(339500965,100);
  sbi.debit(339500965,400);
  sbi.debit(339500965,300);
  sbi.credit(339500965,300);
  sbi.credit(339500965,500);
  sbi.debit(339500965,200);
  // console.log(sbi.getAllDebitsAbove(100,339500965));
  assert.deepEqual(sbi.getAllDebitsAbove(100,339500965),
  [ { transactionType: 'debit', amount: 200 },
  { transactionType: 'debit', amount: 300 },
  { transactionType: 'debit', amount: 400 } ])
  assert.deepEqual(sbi.getAllDebitsAbove(500,339500965),[]);
};


test["Look at all credit transactions below a certain amount"] = function(){
  let sbi = new Bank("sbi");
  sbi.createAccount("manish yadav");
  sbi.credit(339500965,100);
  sbi.credit(339500965,400);
  sbi.credit(339500965,300);
  sbi.debit(339500965,500);
  sbi.credit(339500965,200);
  // console.log(sbi.getAllCreditsBelow(500,339500965));
  assert.deepEqual(sbi.getAllCreditsBelow(500,339500965),
  [ { transactionType: 'credit', amount: 200 },
  { transactionType: 'credit', amount: 300 },
  { transactionType: 'credit', amount: 400 },
  { transactionType: 'credit', amount: 100 } ]);
  assert.deepEqual(sbi.getAllCreditsBelow(100,339500965),[]);
};

test[" Look at all debit transactions below a certain amount"] = function(){
  let sbi = new Bank("sbi");
  sbi.createAccount("manish yadav",10000);
  sbi.debit(339500965,100);
  sbi.debit(339500965,400);
  sbi.debit(339500965,300);
  sbi.credit(339500965,300);
  sbi.credit(339500965,500);
  sbi.debit(339500965,200);
  // console.log(sbi.getAllDebitsBelow(500,339500965));
  assert.deepEqual(sbi.getAllDebitsBelow(100,339500965),[])
  assert.deepEqual(sbi.getAllDebitsBelow(500,339500965),
  [ { transactionType: 'debit', amount: 200 },
  { transactionType: 'debit', amount: 300 },
  { transactionType: 'debit', amount: 400 },
  { transactionType: 'debit', amount: 100 } ]);
};

test[" Look at all credit transaction"] = function(){
  let sbi = new Bank("stateBankOfIndia");
  sbi.createAccount("manish yadav",10000);
  sbi.createAccount("manoj yadav",10000);
  sbi.credit(339500965,1000);
  sbi.transfer(339500965,339500966,1000);
  sbi.credit(339500965,1000);
  sbi.credit(339500965,500);
  sbi.debit(339500965,1000);
  sbi.credit(339500966,1000);
  sbi.transfer(339500965,339500966,1000);
  sbi.transfer(339500965,339500966,1000);
  assert.deepEqual(sbi.getAllCreditTransaction(339500965),
  [ { transactionType: 'credit', amount: 500 },
  { transactionType: 'credit', amount: 1000 },
  { transactionType: 'credit', amount: 1000 } ]);
  assert.deepEqual(sbi.getAllCreditTransaction(339500966),
  [{transactionType: 'credit', amount: 1000}]);
};

test["look at all debit transaction"] = function(){
  let sbi = new Bank("stateBankOfIndia");
  sbi.createAccount("manish yadav",10000);
  sbi.createAccount("manoj yadav",10000);
  sbi.debit(339500965,1000);
  sbi.transfer(339500965,339500966,1000);
  sbi.debit(339500965,500);
  sbi.credit(339500965,500);
  sbi.debit(339500965,1000);
  sbi.transfer(339500965,339500966,1000);
  sbi.transfer(339500965,339500966,1000);
  // console.log(sbi.getAllDebitTransaction(339500965));
  assert.deepEqual(sbi.getAllDebitTransaction(339500965),
  [ { transactionType: 'debit', amount: 1000 },
  { transactionType: 'debit', amount: 500 },
  { transactionType: 'debit', amount: 1000 } ]);
}

test["look at all transfer transaction"] = function(){
  let sbi = new Bank("stateBankOfIndia");
  sbi.createAccount("manish yadav",10000);
  sbi.createAccount("manoj yadav",10000);
  sbi.credit(339500965,1000);
  sbi.transfer(339500965,339500966,1000);
  sbi.credit(339500965,1000);
  sbi.credit(339500965,500);
  sbi.debit(339500965,1000);
  sbi.credit(339500966,1000);
  sbi.transfer(339500965,339500966,1000);
  sbi.transfer(339500965,339500966,1000);
  assert.deepEqual(sbi.getAllTransferTransaction(339500965),
  [ { transactionType: 'transfer',
    amount: 1000,
    transferedTo: 339500966 },
  { transactionType: 'transfer',
    amount: 1000,
    transferedTo: 339500966 },
  { transactionType: 'transfer',
    amount: 1000,
    transferedTo: 339500966 } ]);
}

test["Look at all transfers to a specific person"] = function(){
  let sbi = new Bank("stateBankOfIndia");
  sbi.createAccount("manish yadav",10000);
  sbi.createAccount("manoj yadav",10000);
  sbi.credit(339500965,1000);
  sbi.transfer(339500965,339500966,1000);
  sbi.credit(339500965,1000);
  sbi.credit(339500965,500);
  sbi.debit(339500965,1000);
  sbi.credit(339500966,1000);
  sbi.transfer(339500965,339500966,1000);
  sbi.transfer(339500965,339500966,1000);
  sbi.transfer(339500966,339500965,500);
  // console.log(sbi.getAllTransfersTo(339500965,339500966));
  assert.deepEqual(sbi.getAllTransfersTo(339500966,339500965),
  [{ transactionType: 'transfer', amount: 1000, transferedTo: 339500966 },
  { transactionType: 'transfer', amount: 1000, transferedTo: 339500966 },
  { transactionType: 'transfer', amount: 1000, transferedTo: 339500966 } ]);
  assert.deepEqual(sbi.getAllTransfersTo(339500965,339500966),
  [{ transactionType: 'transfer', amount: 500, transferedTo: 339500965 }]);
};


test["Look at all transfers from a specific person"] = function(){
  let sbi = new Bank("stateBankOfIndia");
  sbi.createAccount("manish yadav",10000);
  sbi.createAccount("manoj yadav",10000);
  sbi.credit(339500965,1000);
  sbi.transfer(339500965,339500966,500);
  sbi.credit(339500965,1000);
  sbi.credit(339500965,500);
  sbi.debit(339500965,1000);
  sbi.credit(339500966,1000);
  sbi.transfer(339500965,339500966,100);
  sbi.transfer(339500965,339500966,400);
  sbi.transfer(339500966,339500965,500);
  // console.log(sbi.getAllTransfersFrom(339500965,339500966));
  // console.log(sbi.getStatement(339500965));
  // console.log(sbi.getAllTransfersFrom(339500966,339500965));
  assert.deepEqual(sbi.getAllTransfersFrom(339500966,339500965),
  [{ transactionType: 'transfer', amount: 500, transferedFrom: 339500966 } ])
  assert.deepEqual(sbi.getAllTransfersFrom(339500965,339500966),
  [ { transactionType: 'transfer', amount: 400, transferedFrom: 339500965 },
  { transactionType: 'transfer', amount: 100, transferedFrom: 339500965 },
  { transactionType: 'transfer', amount: 500, transferedFrom: 339500965 } ]);
};
