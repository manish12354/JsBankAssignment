const CreditTransaction = require("./transaction.js").CreditTransaction;
const DebitTransaction = require("./transaction.js").DebitTransaction;
const TransferedTo = require("./transaction.js").TransferedTo;
const TransferedFrom = require("./transaction.js").TransferedFrom;
const Account = function (holderName,accountNumber,initialBalance){
  this.accountNumber = accountNumber;
  this.holderName = holderName;
  this.balance = initialBalance || 0;
  this.listOfTransactions = [];
}

Account.prototype = {
  getBalance: function(){
    return this.balance;
  },

  credit: function(amount){
    if(amount>0){
      let Credit = new CreditTransaction(amount);
      // console.log(creditTransaction);
      this.balance+=amount;
      this.listOfTransactions.unshift(Credit);
    }
    return this.getBalance();
  },

  debit: function(amount){
    if(amount>0 && amount <=this.balance){
      let Debit = new DebitTransaction(amount);
      // console.log(Debit);
      this.balance-=amount;
      this.listOfTransactions.unshift(Debit);
    }
    return this.getBalance();
  },

  transfer: function(payee,amount){
    if(amount>0 && amount <=this.balance){
      let transferedTo = new TransferedTo(payee.accountNumber,amount);
      let transferedFrom = new TransferedFrom(this.accountNumber,amount)
      // console.log(transferTransaction);
      // console.log(payee);
      this.balance-=amount;
      payee.balance+=amount;
      this.listOfTransactions.unshift(transferedTo);
      payee.listOfTransactions.unshift(transferedFrom);
    }
  },

  getSummary: function(){
    return {
      date: Date(),
      holderName: this.holderName,
      accountNumber: this.accountNumber,
      balance: this.getBalance(),
    };
  },


  getStatement: function(){
    return {
      date: Date(),
      holderName: this.holderName,
      accountNumber: this.accountNumber,
      balance: this.getBalance(),
      listOfTransactions: this.listOfTransactions
    }
  },

  getAllCreditsAbove: function (limit){
    return this.listOfTransactions.filter(function(transaction){
      // console.log(transaction);
      return transaction.isCreditTransaction() && transaction.isCreditAbove(limit);
    });
  },

  getAllDebitsAbove: function (limit){
    return this.listOfTransactions.filter(function(transaction){
      return transaction.isDebitTransaction() && transaction.isDebitAbove(limit);
    });
  },

  getAllCreditsBelow: function(limit){
    return this.listOfTransactions.filter(function(transaction){
      return transaction.isCreditTransaction() && transaction.isCreditBelow(limit);
    });
  },

  getAllDebitsBelow: function(limit){
    return this.listOfTransactions.filter(function(transaction){
      return transaction.isDebitTransaction() && transaction.isDebitBelow(limit);
    });
  },

  getAllCreditTransaction: function(){
    // console.log(transactionType);
    // console.log(this);
    return this.listOfTransactions.filter(function(transaction){
      return transaction.isCreditTransaction();
    });
  },


  getAllDebitTransaction:function(){
    return this.listOfTransactions.filter(function(transaction){
      return transaction.isDebitTransaction();
    });
  },

  getAllTransferTransaction: function(){
    return this.listOfTransactions.filter(function(transaction){
      return transaction.isTransferTransaction();
    });
  },


  getAllTransfersTo: function(payee){
    // console.log(this);
    // console.log(payee);
    // console.log(this.listOfTransactions);
    return this.listOfTransactions.filter(function(transaction){
      return transaction.isTransferTransaction() && transaction.isTransferedTo(payee);
    });
  },

  getAllTransfersFrom: function(payer){
    // console.log(this);
    return this.listOfTransactions.filter(function(transaction){
      return transaction.isTransferTransaction() && transaction.isTransferedFrom(payer);
    });
  }
}
module.exports = Account;
